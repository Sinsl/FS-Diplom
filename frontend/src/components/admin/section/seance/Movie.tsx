import {MovieDrag} from "./SeanсeGrid";
import { useDrag } from 'react-dnd'

interface MovieProps {
    movie: MovieDrag,
}

export const Movie = ({movie}: MovieProps) => {
    // console.log(movie)
    const [{ isDragging }, dragRef, preview] = useDrag({
        type: 'movie',
        item: { id: movie.id, f_id: movie.films_id, title: movie.films_title, dur: movie.films_duration },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    return (
        <>
            {isDragging ?
                (<div style={{display: 'none'}} ref={preview}></div>)
                : 
                (<div className="conf-step__seances-movie"
                    key={movie.id}
                    style={{
                        backgroundColor: movie.bg_color,
                        width: String(movie.width) + "px",
                        left: String(movie.left) + "px"
                    }}
                    ref={dragRef}
                >
                    <p className="conf-step__seances-movie-title">{movie.films_title}</p>
                    <p className="conf-step__seances-movie-start" style={{opacity: isDragging ? 0 : 1}}>{movie.time.slice(0, 5)}</p>
                </div>)    
            }
        </>


        
    )
}