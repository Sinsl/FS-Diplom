import { FilmProps } from "../../../types/types";
import { MoviesList } from "./MoviesList";

export const Film = ({ data }: FilmProps ) => {
    return (
        <section className="movie">
            <div className="movie__info">
                <div className="movie__poster">
                    <img className="movie__poster-image" alt="Звёздные войны постер" src={import.meta.env.VITE_BACKEND_URL + '/' + data.url_img} />
                </div>
                <div className="movie__description">
                    <h2 className="movie__title">{data.title}</h2>
                    <p className="movie__synopsis">{data.description}</p>
                    <p className="movie__data">
                        <span className="movie__data-duration">{data.duration} минут </span>
                        <span className="movie__data-origin">{data.country}</span>
                    </p>
                </div>
            </div>
            <MoviesList filmsId={data.id}/>
        </section>
    )
}