import { NavPage } from "../nav/NavPage"
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store/store';
import { useEffect, useState } from "react";
import { Film } from "./Film";
import { FilmType } from "../../../types/types";
import { getDateForDB } from "../functions/functions";

export const Home = () => {
    const { selectedDay } = useSelector((state: RootState) => state.selectedDay);
    const [films, setFilms] = useState<FilmType[]>([]);

    useEffect(() => {
        (async () => {
            const dateForDB = getDateForDB(selectedDay);
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/films?date=' + dateForDB);
            if (resp.ok) {
                const data = await resp.json();
                setFilms(data);
            }
        })()
    }, [selectedDay])

    return (
        <>
            <NavPage />
            <main>
                {films.length && films.map(item => <Film key={item.id} data={item}/>)}
                {!films.length && <div>Нет сеансов</div>}
            </main>
        </>
    )
}