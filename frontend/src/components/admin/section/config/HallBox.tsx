import { useEffect, useState, ChangeEvent } from "react";
import { requests } from "../../requests";
import {  Seats, CategorySeats, SeatsAdmin } from "../../../../types/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from '../../redux/store/store';
import { Seat } from "./Seat";
import { fetchHalls } from "../../redux/slices/getHallsSlice";


interface HallBoxProps {
    hallId: number
}
export const HallBox = ({hallId}: HallBoxProps) => {
    const [seats, setSeats] = useState<SeatsAdmin[][] | null>(null);
    const [catSeats, setCatSeats] = useState<CategorySeats[] | null>(null);
    const {halls, loading, error} = useSelector((state: RootState) => state.halls);
    const [size, setSize] = useState({row: 0, seats: 0});
    const dispatch: AppDispatch = useDispatch();

    const getSeats = async () => {
        try {
            const response = await requests('get', `/admin/hall/${hallId}/seats`, null);
            if (response) {
                const seats: Seats[] = response.data.seats;
                seats.sort((a, b) => a.id - b.id);
                const tempArr: SeatsAdmin[][] = [];
                seats.forEach(elem => {
                    const newElem: SeatsAdmin = {
                        active: elem.active, 
                        category_seats_id: elem.category_seats_id,
                        halls_id: elem.halls_id,
                        id: elem.id,
                        row: elem.row,
                        seat: elem.seat,
                        category_seats: elem.category_seats,
                        isChange: false,
                        isNew: false,
                        isDel: false
                    }
                    if(elem.row > tempArr.length) {
                        tempArr.push([newElem])
                    } else {
                        tempArr[elem.row - 1].push(newElem)
                    }
                });
                setSeats(tempArr);
                setCatSeats(response.data.cat);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const hall = halls.find(hall => hall.id === hallId);
        if (hall) {
            setSize({row: hall.rows, seats: hall.count_seat})
        }
        getSeats();        
    }, [hallId])

    const changeCatHandler = (id: number, cat: string) => {
        const obj: any = {};
        switch (cat) {
            case 'simple':
                if (catSeats) {
                    const simpleCat = catSeats.find(item => item.title === 'simple')
                    if (simpleCat) {
                        obj.active = true
                        obj.category_seats = simpleCat;
                        obj.category_seats_id = simpleCat.id
                        obj.isChange = true
                    }
                }                
                break;
            case 'vip':
                if (catSeats) {
                    const simpleCat = catSeats.find(item => item.title === 'vip')
                    if (simpleCat) {
                        obj.active = true
                        obj.category_seats = simpleCat;
                        obj.category_seats_id = simpleCat.id
                        obj.isChange = true
                    }
                } 
                break;
            case 'disabled':
                obj.active = false
                obj.isChange = true
                break;
        
            default:
                break;
        }
        let tempSeat: SeatsAdmin[][] = []
        if(seats) {
            tempSeat = seats.map(row => {
                return row.map(seat => {
                    if (seat.id === id) {
                        return {...seat, ...obj}
                    } else {
                        return seat
                    }
                })
            })
        }        
        setSeats(tempSeat)
    }

    const onChangeHall = (e: ChangeEvent<HTMLInputElement>) => {
        let {name, value} = e.target;
        value = value.trim() === '' ? '0' : value.trim();
        if(!isNaN(parseInt(value))) {
            setSize((prev) => ({...prev, [name]: parseInt(value)}))
        }
        
    }

    const onApplyHall = () => {
        const hall = halls.find(item => item.id === hallId);
        const deffRow = seats ? size.row - seats.length : 0;
        const deffSeats = seats ? size.seats - seats[0].length : 0;

        const tempArr = seats && seats.map(row => row.map(seat => seat));
        const cat = catSeats?.find(item => item.title === 'simple');

        if(deffRow < 0) {
            const counter = deffRow * -1;
            tempArr && tempArr.forEach((row, idx, arr) => row.forEach(seat => {
                (idx >= arr.length - counter) ? seat.isDel = true : seat.isDel = false                
            })) 
        }
        if (deffSeats < 0) {
            const counter = deffSeats * -1;
            tempArr && tempArr.forEach(row => row.forEach((seat, idx) => {
                (idx >= row.length - counter) ? seat.isDel = true : seat.isDel = !!seat.isDel
            }))            
        }

        if (hall && deffRow >= 0) {
            if (cat) {
                tempArr && tempArr.forEach((row) => row.forEach((seat, idx) => {
                    (idx > size.seats - 1) ? seat.isDel = true : seat.isDel = false                
                })) 
                let counterRow = 0;
                while (counterRow < deffRow) {
                    let counterSeats = 0;
                    console.log('len', tempArr?.length)
                    console.log('row', hall.rows, counterRow)
                    console.log('sum', hall.rows + counterRow )
                    const tempSeats: SeatsAdmin[] = [];
                    while(counterSeats < size.seats) {
                        console.log('seat', counterSeats + 1)
                        tempSeats.push({
                            active: true, 
                            category_seats_id: cat.id,
                            halls_id: hall.id,
                            id: ((hall.rows + counterRow) * 10 + counterSeats) * -1,
                            row: hall.rows + counterRow,
                            seat: counterSeats + 1,
                            category_seats: cat,
                            isChange: false,
                            isNew: true,
                            isDel: false
                        })
                        counterSeats += 1;
                    }
                    tempArr?.push(tempSeats);
                    counterRow += 1;
                }
            }            
        }
        
        if (hall && deffSeats > 0) {
            if (cat) {
                tempArr && tempArr.forEach((row, idx) => {
                    let counterSeats = 0;
                    if (row.length < size.seats) {
                        while(counterSeats < deffSeats) {
                            row.push({
                                active: true, 
                                category_seats_id: cat.id,
                                halls_id: hall.id,
                                id: ((idx + 1) * 10 + row.length + counterSeats + 1) * -1,
                                row: idx + 1,
                                seat: row.length + counterSeats + 1,
                                category_seats: cat,
                                isChange: false,
                                isNew: true,
                                isDel: false
                            })
                            counterSeats += 1;
                        }
                    }
                    
                })
            }
        }
        setSeats(tempArr);
    }

    const onSave = async () => {
        const changes: SeatsAdmin[] = [];
        const news: SeatsAdmin[] = [];
        const deletes: SeatsAdmin[] = [];
        seats?.forEach(row => row.forEach(seat => {
            seat.isChange && !seat.isNew && !seat.isDel && changes.push(seat);
            seat.isNew && !seat.isDel && news.push(seat);
            seat.isDel && !seat.isNew && deletes.push(seat);
        }));
        const hall = halls.find(item => item.id === hallId);
        const response = await requests('put', `/admin/hall/seats/update`, {hall, size, changes, news, deletes});
            if (response) {
                console.log(response.data);
                if(response.data && response.data.records_update > 0) {
                    await dispatch(fetchHalls());
                    getSeats();
                }
            }
    }
    return (
        <>
            <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
            <div className="conf-step__legend">
                <label className="conf-step__label">Рядов, шт
                    <input type="text" className="conf-step__input" name="row" value={size.row} onChange={onChangeHall}/>
                </label>
                <span className="multiplier">x</span>
                <label className="conf-step__label">Мест, шт
                    <input type="text" className="conf-step__input" name="seats" value={size.seats} onChange={onChangeHall}/>
                </label>
                <input type="button" value="Применить" className="conf-step__button conf-step__button-accent btn-change-seets" onClick={onApplyHall}/>
            </div>

            <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
            <div className="conf-step__legend">
                <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
                <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
                <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
                <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
            </div>  
        
            <div className="conf-step__hall">
                <div className="conf-step__hall-wrapper">
                    {seats && !loading && seats.map((row, idx) => 
                        <div className="conf-step__row" key={idx}>
                            {row.map((seat) => {
                                if (!seat.isDel) {
                                    return <Seat key={seat.id} seat={seat} changeCat={changeCatHandler}/>
                                }
                            })}
                        </div>
                    )}
                { loading && <p className="empty-msg">загрузка данных</p> }
                { error && <p className="error-msg">{error}</p> }
                </div>  
            </div>
        
        <fieldset className="conf-step__buttons text-center">
          <button className="conf-step__button conf-step__button-regular">Отмена</button>
          <input type="button" value="Сохранить" className="conf-step__button conf-step__button-accent" onClick={onSave}/>
        </fieldset>   
        </>
    )
}