import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from '../../redux/store/store';
import { fetchHalls } from "../../redux/slices/getHallsSlice";
import { changeSelect } from "../../redux/slices/selectedHallSlice";
import { PriceForm } from "./PriceForm";
import { requests } from "../../requests";
import { CategorySeats } from "../../../../types/types";

export const ConfigPrice = () => {
    const {halls, loading, error} = useSelector((state: RootState) => state.halls);
    const {selectHall} = useSelector((state: RootState) => state.selectHall);
    const dispatch: AppDispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [valueInputs, setValueInputs] = useState({simple: 0, vip: 0});
    // const 

    const clickOpen = () => setIsOpen(prev => !prev);

    const selectClick = (id: number) => {
        dispatch(changeSelect(id))
    }

    const getCat = async () => {
        const response = await requests('get', `/admin/hall/${selectHall}/cat-seats`, null);
        if (response && response.data) {
            const data: CategorySeats[] = response.data;
            const simple = data.find(item => item.title === 'simple') as CategorySeats;
            const vip = data.find(item => item.title === 'vip') as CategorySeats;
            if (simple && vip) {
                setValueInputs({simple: simple.price, vip: vip.price })
            }
            
        }
    }

    useEffect(() => {
        if (isOpen) {
            if (halls.length === 0) {
                dispatch(fetchHalls());
            }
        }        
    }, [isOpen])

    useEffect(() => {
        if (halls.length > 0 && selectHall === 0) {
            dispatch(changeSelect(halls[0].id))
        }
    }, [halls])

    useEffect(() => {
        if (selectHall !== 0) {
            getCat();
        }
    }, [selectHall])

    const changeInputsHandler = (name: string, value: string) => {
        const valueInputs = value.trim() === '' ? '0' : value.trim();
        if(!isNaN(parseInt(valueInputs))) {
            setValueInputs(prev => ({ ...prev, [name]: parseInt(valueInputs) }));
        }
        

    }

    const onSave = async () => {
        const response = await requests('put', `/admin/hall/cat-seats/update`, {hallId: selectHall, price: valueInputs});
        if (response) {
            if(response.data && response.data.records_update > 0) {
                await dispatch(fetchHalls());
                getCat();
            }
        }
    }


    return (
        <section className="conf-step">
            <header className={`conf-step__header ${isOpen ? 'conf-step__header_opened' : 'conf-step__header_closed'}`}  onClick={clickOpen}>
                <h2 className="conf-step__title">Конфигурация цен</h2>
            </header>
            <div className="conf-step__wrapper">
                <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
                {!loading && halls.length > 0 && 
                        <ul className="conf-step__selectors-box">
                            {halls.map(hall => 
                                <li key={hall.id}
                                    data-id={hall.id}
                                    onClick={() => selectClick(hall.id)}
                                >
                                    <span className={`conf-step__selector ${selectHall === hall.id ? 'active' : ''}`}>
                                        {hall.title}
                                    </span>
                                </li>
                            )}
                        </ul> }
                { loading && <p className="empty-msg">загрузка данных</p> }
                { error && <p className="error-msg">{error}</p> }
          
                <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
                <PriceForm valuesInputs={valueInputs} changeInputs={changeInputsHandler}/>           
        
                <fieldset className="conf-step__buttons text-center">
                    <button className="conf-step__button conf-step__button-regular" onClick={getCat}>Отмена</button>
                    <input type="button" value="Сохранить" className="conf-step__button conf-step__button-accent" onClick={onSave}/>
                </fieldset>  
            </div>
        </section>
    )
}