import { useLocation, useNavigate } from "react-router-dom";
import './payment.css';
import { StatePayment } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

interface DataRequest {
    movieId: number,
    seats: number[]
}

export const Payment = () => {
    const { selectedDay } = useSelector((state: RootState) => state.selectedDay);
    let { state }  = useLocation();
    const navigate = useNavigate();
    const { movie, selected }: StatePayment = state;

    const createQrCode = async () => {
        const dataReq = {
            movieId: movie.id,
            seats: []
        } as DataRequest;

        selected.forEach(item => dataReq.seats.push(item.id));
        
        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/ticket/create',
        {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataReq)
        });
            if (resp.ok) {
                const data = await resp.json();
                console.log(data)
                navigate('/ticket/' + data.id);
            }
    }


    return (
        <main>
            <section className="ticket">
      
                <header className="tichet__check">
                    <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
                </header>
                
                <div className="ticket__info-wrapper">
                    <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{movie.films?.title}</span></p>
                    <p className="ticket__info">Места: {
                        selected.map(seat => <span className="ticket__details ticket__chairs" key={seat.id}>{`ряд: ${seat.row} место: ${seat.seat} `}</span>)
                    }</p>
                    <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{movie.halls?.title}</span></p>
                    <p className="ticket__info">Дата сеанса: <span className="ticket__details ticket__date">{new Date(selectedDay).toLocaleDateString()}</span></p>
                    <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{movie.start_time.slice(0, 5)}</span></p>
                    <p className="ticket__info">Стоимость: 
                        <span className="ticket__details ticket__cost">{selected.reduce((acc, item) => acc + item.category_seats.price, 0)}</span> рублей
                    </p>
                    <button className="acceptin-button" onClick={createQrCode}>Получить код бронирования</button>

                    <p className="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
                    <p className="ticket__hint">Приятного просмотра!</p>
                </div>
            </section>   
        </main>
    )
}