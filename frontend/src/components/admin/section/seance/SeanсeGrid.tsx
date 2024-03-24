import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from '../../redux/store/store';
import { fetchHalls } from "../../redux/slices/getHallsSlice";
import { requests } from "../../requests";
import { Hall } from "./Hall";
import { Film } from "./Film";
import { FilmType, Movies } from "../../../../types/types";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AddFilmForm } from "./AddFilmForm";
import { AddFilm } from "./AddFilmForm";
import { bgColor} from '../../bgColor'

export interface MovieDrag {
    id: number,
    films_id: number,
    films_title: string,
    films_duration: number,
    time: string,
    left: number,
    width: number,    
    bg_color: string,
    isNew: boolean,
    isChange: boolean
}

export interface StateHallsMovies {
    hallId: number,
    hallTitle: string,
    movies: MovieDrag[]
}

export const SeanсeGrid = () => {
    const {halls, loading, error} = useSelector((state: RootState) => state.halls);
    const [films, setFilms] = useState<FilmType[]>([]);
    const [week, setWeek] = useState({start: '', end: '', diff: 0})
    const dispatch: AppDispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [movies, setMovies] = useState<StateHallsMovies[] | null >(null)
    const [isAddFilm, setIsAddFilm] = useState(false);

    const clickOpen = () => setIsOpen(prev => !prev);

    const getFilms = async() => {
        const response = await requests('get', `/admin/films`, null);
        if (response && response.data) {
            const arr: FilmType[] = response.data.map((item: FilmType) => {return {...item, isNew: false}})
            setFilms(arr);
        }
    }

    const getMovie = async () => {
        // let tempMovies = movies ? movies.map(item => item) : [];
        let tempMovies = [] as StateHallsMovies[];
        for (const hall of halls) {
            const response = await requests('get', `/admin/hall/${hall.id}/movies`, {mon: week.start});
            if (response && response.data) {
                const tempArrMovie = [] as MovieDrag[];
                response.data.forEach((movie: Movies) => {
                    tempArrMovie.push({
                        id: movie.id,
                        films_id: movie.films ? movie.films.id : -1,
                        films_title: movie.films ? movie.films.title : '',
                        films_duration: movie.films ? movie.films.duration : 0,
                        time: movie.start_time,
                        left: (+movie.start_time.slice(0, 2) * 60 + +movie.start_time.slice(3, 5)) / 2,
                        width: movie.films ? movie.films.duration / 2 : 0,    
                        bg_color: movie.films ? movie.films.bg_color : '#FFEB85',
                        isNew: false,
                        isChange: false
                    })
                })       
                if ( tempMovies.length > 0) {
                    tempMovies = tempMovies.filter(item => item.hallId !== hall.id);
                    tempMovies.push({hallId: hall.id, hallTitle: hall.title, movies: tempArrMovie})
                } else {
                    tempMovies = [{hallId: hall.id, hallTitle: hall.title, movies: tempArrMovie}]
                }                
            }
        }
        setMovies(tempMovies)
    }

    const setDataWeek = (diff: number) => {
        const date = new Date();
        const day = date.getDay();
        const diffDay = day === 0 ? -6 : (day - 1) * -1;
        const start = new Date(date.setDate(date.getDate() + diffDay + 7 * diff));
        const end = new Date(date.setDate(date.getDate() + 6));
        setWeek({start: start.toLocaleDateString(), end: end.toLocaleDateString(), diff})
    }

    useEffect(() => {
        if(isOpen) {
            if (!halls.length) {
                dispatch(fetchHalls());
            }
            if (!week.start) {
                setDataWeek(1);
            }
            getFilms();
        }
    }, [isOpen])

    useEffect(() => {
        getMovie();
    }, [week, halls])

    const changeWeek = (diffChange: number) => {
        setDataWeek(week.diff + diffChange);
    }

    const onDropHandler = (obj: any) => {
        const tempMovieArr = movies ? movies.map(item => item) : [];
        if(obj.type === 'film') {
            const newMovie = {
                id: obj.hallId * -50 - obj.def,
                films_id: obj.item.f_id,
                films_title: obj.item.title,
                films_duration: obj.item.dur,
                time: ("0" + String(Math.floor(obj.def / 30))).slice(-2) + ":" + ("0" + String((obj.def * 2) % 60)).slice(-2) + ":00",
                left: obj.def,
                width: obj.item.dur / 2,    
                bg_color: obj.item.bg_color,
                isNew: true,
                isChange: false
            }
            const find = tempMovieArr?.find(elem => elem.hallId === obj.hallId)
            find?.movies.push(newMovie)
        }
        if (obj.type === 'movie') {
            const findIdxHall = tempMovieArr.findIndex(hall => hall.movies.find(item => item.id === obj.item.id));
            const findMovie = tempMovieArr[findIdxHall].movies.find(item => item.id === obj.item.id)
            if (findMovie) {
                findMovie.isChange = true;
                findMovie.left = obj.def;
                findMovie.time = ("0" + String(Math.floor(obj.def / 30))).slice(-2) + ":" + ("0" + String((obj.def * 2) % 60)).slice(-2) + ":00";
                if (tempMovieArr[findIdxHall].hallId !== obj.hallId) {
                    tempMovieArr[findIdxHall].movies = tempMovieArr[findIdxHall].movies.filter(elem => elem.id !== obj.item.id)
                    const newHall = tempMovieArr.find(elem => elem.hallId === obj.hallId);
                    if (newHall) {
                        newHall.movies.push(findMovie)
                    }                
                }
            }
            
        }
        setMovies(tempMovieArr)
    }

    const addFilmHandler = (data: AddFilm | undefined) => {
        console.log(data)
        setIsAddFilm(false);
        if (data) {
            const newFilm = {
                id: films.length * -10,
                title: data.title,
                description: data.description,
                url_img: data.urlImg,
                duration: data.duration,
                country: data.country,
                bg_color: bgColor[(films.length + 1) % 10],
                isNew: true,
            }
            setFilms(prev => [...prev, newFilm]);
        }
    }

    const onReset = () => {
        getFilms();
        getMovie();
    }

    const onSave = async () => {
        console.log('save')
        const newFilm: any = [];
        const newMovieArr: any = [];
        const updateMovieArr: any = [];
        films.forEach(film => {
            if(film.isNew) {
                newFilm.push({
                    id: film.id,
                    title: film.title,
                    description: film.description,
                    url_img: film.url_img,
                    duration: film.duration,
                    country: film.country,
                    bg_color: film.bg_color
                })
            }
        })
        movies?.forEach(hall => {
            hall.movies.forEach(mov => {
                // console.log(hall.hallId, mov)
                const movieSave = {
                    id: mov.id,
                    date: week.start,
                    start_time: mov.time,
                    halls_id: hall.hallId,
                    films_id: mov.films_id,                    
                }
                if (mov.isNew) {
                    newMovieArr.push(movieSave)
                }
                if (mov.isChange && !mov.isNew) {                    
                    updateMovieArr.push(movieSave);
                }
            })
        })
        const response = await requests('post', `/admin/film/movie`, {new_film: newFilm, new_movie: newMovieArr, update_movie: updateMovieArr});
        if (response && response.data) {
            onReset();
        }

    }


    return (
        <section className="conf-step">
            <header className={`conf-step__header ${isOpen ? 'conf-step__header_opened' : 'conf-step__header_closed'}`}  onClick={clickOpen}>
                <h2 className="conf-step__title">Сетка сеансов</h2>
            </header>
            <DndProvider backend={HTML5Backend}>
                <div className="conf-step__wrapper">
                    <p className="conf-step__paragraph">
                        <button className="conf-step__button conf-step__button-accent" onClick={() => setIsAddFilm(!isAddFilm)}>Добавить фильм</button>
                    </p>
                    {isAddFilm && <AddFilmForm addHandler={addFilmHandler}/>}
                    <div className="conf-step__movies">
                        {films.length > 0 && films.map(item => <Film key={item.id} film={item}/>)}
                    </div>

                    <div className="conf-step__week">
                        <div className="conf-step__week-title">Расписание на неделю: </div>
                        <div className="conf-step__week-data_dox">
                            <span className="arrow-left" onClick={(() => changeWeek(-1))}>&lt;</span>
                            <span className="week-start">{week.start}</span>
                            <span className="arrow-minus">&minus;</span>
                            <span className="week-end">{week.end}</span>
                            <span className="arrow-right" onClick={(() => changeWeek(1))}>&gt;</span>
                        </div>
                        
                    </div>
                
                    <div className="conf-step__seances">
                        {movies && movies.length > 0 && !loading && movies.map(hall => <Hall key={hall.hallId} hallMovies={hall} dropHandler={onDropHandler}/> )}
                        { loading && <p className="empty-msg">загрузка данных</p> }
                        { error && <p className="error-msg">{error}</p> }
                    </div> 
                
                    <fieldset className="conf-step__buttons text-center">
                        <button className="conf-step__button conf-step__button-regular" onClick={onReset}>Отмена</button>
                        <input type="button" value="Сохранить" className="conf-step__button conf-step__button-accent" onClick={onSave}/>
                    </fieldset>  
                </div>
            </DndProvider>
        </section>
    )
}