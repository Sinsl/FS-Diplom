import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MadeTicket } from "../../types/types";

export const Ticket = () => {
    const { id } = useParams();
    const [data, setData] = useState<MadeTicket | null>(null);

    useEffect(() => {
        (async () => {
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/ticket/' + id);
            if (resp.ok) {
                const data: MadeTicket = await resp.json();
                console.log(data)
                setData(data);
            }
        })()
    }, [])

    return (
        <main>
            <section className="ticket">
                <header className="tichet__check">
                    <h2 className="ticket__check-title">Электронный билет</h2>
                </header>
                
                {data && <div className="ticket__info-wrapper">
                    <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{data.film_title}</span></p>
                    <p className="ticket__info">Места:  
                        {data.seats.map(item => <span className="ticket__details ticket__chairs" key={item.seat_id}>
                                {` ряд: ${item.seat_row} место: ${item.seat_seat} `}
                            </span>
                        )}                        
                    </p>
                    <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{data.hall_title}</span></p>
                    <p className="ticket__info">Дата сеанса: <span className="ticket__details ticket__date">{new Date(data.movie_date).toLocaleDateString()}</span></p>
                    <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{data.movie_time.slice(0, 5)}</span></p>

                    <img className="ticket__info-qr" src={data.ticket_qrcode_url}/>

                    <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
                    <p className="ticket__hint">Приятного просмотра!</p>
                </div>}
            </section>     
        </main>
    )
}
