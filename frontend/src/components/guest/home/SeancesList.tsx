import { SeanceHallProps } from "../../../types/types";
import { Link } from "react-router-dom";

export const SeancesList = ({seancesHall}: SeanceHallProps) => {
    return (
        <div className="movie-seances__hall">
            <h3 className="movie-seances__hall-title">{seancesHall.hallTitle}</h3>
            <ul className="movie-seances__list">
                {seancesHall.hallOpen
                
                ? seancesHall.movieArr.map(movie => (
                    <li className="movie-seances__time-block" key={movie.id}>
                        <Link to={"/hall/" + movie.id} className="movie-seances__time">{movie.start_time.slice(0, 5)}</Link>
                    </li>
                ))
                : <li className="movie-seances__is-close">Продажа билетов временно приостановлена! Зайдите чуть позже.</li>
                }
            </ul>
        </div>
    )
}