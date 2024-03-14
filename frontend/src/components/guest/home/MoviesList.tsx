import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { useEffect, useState } from "react";
import { getDateForDB } from "../functions/functions";
import { SeancesList } from "./SeancesList";
import { MoviesListProps, StateMovies, Movies } from "../../../types/types";

export const MoviesList = ({ filmsId }: MoviesListProps) => {
    const { selectedDay } = useSelector((state: RootState) => state.selectedDay);
    const [movies, setMovies] = useState<StateMovies[]>([]);

    useEffect(() => {
        (async () => {
            const dateForDB = getDateForDB(selectedDay);
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/movies?' + new URLSearchParams({
                filmId: String(filmsId),
                date: dateForDB
            }));
            if (resp.ok) {
                const data: Movies[] = await resp.json();
                const tempArr: StateMovies[] = [];
                if (data.length) {
                    data.forEach(movie => {
                        const findHall = tempArr.find(item => item.hallId === movie.halls_id);
                        if(findHall){
                            findHall.movieArr.push(movie)
                        } else {
                            tempArr.push({
                                hallId: movie.halls_id,
                                hallTitle: movie.title,
                                movieArr: [movie]
                            })
                        }
                    });
                }
                setMovies(tempArr);
            }
        })()
    }, [])

    console.log(movies);

    return (
        <>
            {movies.map(hall => <SeancesList key={hall.hallId} seancesHall={hall}/>)}
            
        </>
    )
}