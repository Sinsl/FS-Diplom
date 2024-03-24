import { FilmType } from "../../../../types/types";
import { useDrag } from 'react-dnd'
import { useEffect } from 'react'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { CustomFilm } from './CustomFilm'


interface FilmTypeProps {
    film: FilmType
}

export const Film = ({film}: FilmTypeProps) => {

    const [{ isDragging }, dragRef, preview] = useDrag({
        type: 'film',
        item: { f_id: film.id, title: film.title, dur: film.duration, bg_color: film.bg_color },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
      }, [])

    return (
        <>
        <div className="conf-step__movie" key={film.id} style={{backgroundColor: film.bg_color}} ref={dragRef}>
            <img className="conf-step__movie-poster" alt="poster" 
                src={film.url_img.slice(0, 4) === 'http' ? film.url_img : import.meta.env.VITE_BACKEND_URL + '/' + film.url_img}
            />
            <h3 className="conf-step__movie-title">{film.title}</h3>
            <p className="conf-step__movie-duration">{film.duration} минут</p>
        </div>
        {isDragging && <CustomFilm />} 
        </>
            
    )
}