import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Movies, Seats, DataSeatsCats, ObjSeatsCat, Ticket } from "../../../types/types";
import './halls.css'
import { Seat } from "./Seat";


export const Hall = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<Movies | null>(null);
    const [seats, setSeats] = useState<Seats[][] | null>(null);
    const [catSeats, setCatSeats] = useState<ObjSeatsCat | null>(null);
    const [occupied, setOccupied] = useState<number[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

    useEffect(() => {
        (async () => {
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/movies/' + id);
            if (resp.ok) {
                const data: Movies = await resp.json();
                setMovie(data);
            }
        })()
    }, [])

    useEffect(() => {
        if (movie){
            (async () => {
                const resp = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/halls/' + movie.halls_id +'/seats');
                if (resp.ok) {
                    const data: DataSeatsCats = await resp.json();
                    const tempArr: Seats[][] = [];
                    data.seats.forEach(elem => {
                        if(elem.row > tempArr.length) {
                            tempArr.push([elem])
                        } else {
                            tempArr[elem.row - 1].push(elem)
                        }
                    });
                    setSeats(tempArr);

                    const tempObj: ObjSeatsCat = {};
                    data.cat_seats.forEach(item =>  item.title === 'simple' ? tempObj.simple = item : tempObj.vip = item );
                    setCatSeats(tempObj)
                }

                const resp1 = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/movie/' + movie.id +'/tickets');
                if (resp1.ok) {
                    const data1: Ticket[] = await resp1.json();
                    const tempSeatId: number[] = [];
                    data1.forEach(item => {
                        if (item.ticket_seats && item.ticket_seats.length) {
                            item.ticket_seats.forEach(elem => tempSeatId.push(elem.seat_id))
                        }
                    });
                    // console.log(tempSeatId)
                    setOccupied(tempSeatId);
                }
            })()
        }        
    }, [movie])

    const selectedHandler = (seatId:number) => {
        // console.log(seatId);
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(item => item !== seatId));
        } else {
            setSelectedSeats((item) => [...item, seatId]);
        }
    }

    const paymentHandler = () => {
        const selectSeats: Seats[] = [];
        seats?.forEach(item => {
            item.forEach(seat => {
                if (selectedSeats.includes(seat.id)) {
                    selectSeats.push(seat);
                }
            })
        })
        // console.log(selectSeats);
        navigate("/payment", { state: {selected: selectSeats, movie: movie}});
    }
    
    return (
        <main>
            {movie && <section className="buying">
                <div className="buying__info">
                    <div className="buying__info-description">
                        <h2 className="buying__info-title">{movie.films && movie.films.title}</h2>
                        <p className="buying__info-start">Начало сеанса: {movie.start_time.slice(0, 5)}</p>
                        <p className="buying__info-hall">{movie.halls && movie.halls.title}</p>          
                    </div>
                    <div className="buying__info-hint">
                        <p>Тапните дважды, чтобы увеличить</p>
                    </div>
                </div>
                <div className="buying-scheme">
                    <div className="buying-scheme__wrapper">
                        {seats && seats.map((row, idx) => 
                            <div className="buying-scheme__row" key={idx}>
                                {row.map(seat => <Seat key={seat.id} seat={seat} isOccupied={occupied.includes(seat.id)} selected={selectedHandler}/>)}
                            </div>)}
                    </div>
                    <div className="buying-scheme__legend">
                        <div className="col">
                            <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно (<span className="buying-scheme__legend-value">{catSeats?.simple?.price}</span> руб)</p>
                            <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP (<span className="buying-scheme__legend-value">{catSeats?.vip?.price}</span> руб)</p>            
                        </div>
                        <div className="col">
                            <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_taken"></span> Занято</p>
                            <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано</p>                    
                        </div>
                    </div>
                    <button className="acceptin-button" onClick={paymentHandler} >Забронировать</button>
                </div>
            </section>}
        </main>
    )
}