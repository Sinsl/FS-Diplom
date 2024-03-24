import { useEffect, useState } from "react";
import { Movie } from "./Movie";
import { StateHallsMovies, MovieDrag } from "./SeanсeGrid";
import { useRef } from 'react';
import { useDrop } from 'react-dnd';

interface HallMoviesProps {
    hallMovies: StateHallsMovies,
    dropHandler: (obj: any) => void
}

export const Hall = ({hallMovies, dropHandler}: HallMoviesProps) => {
    const { hallId, hallTitle} = hallMovies;
    const [movies, setMovie] = useState<MovieDrag[]>([]);
    const boxRef = useRef<HTMLHeadingElement>(null);
    const [def, setDef] = useState(0);
    const [{ isOver, canDrop }, dropRef] = useDrop({
        accept: ['film', 'movie'],
        drop: (item, monitor) => {
            dropHandler({type: monitor.getItemType(), hallId, hallTitle, item, def})
            setDef(0)
        },
        hover: (item, monitor) => {
                const offset = monitor.getSourceClientOffset() ? monitor.getSourceClientOffset()?.x : 0;
                if (offset) {
                    const left = boxRef.current ? boxRef.current.offsetLeft : 0;
                    const shift = monitor.getItemType() === 'film' ? 126 : 160;
                    let result = Math.round((offset - shift - left) / 5) * 5;
                    result = result < 0 ? 0 : result;
                    // console.log(item)
                    result = (result + item.dur / 2) > 720 ? (720 - item.dur / 2) : result;
                    setDef(result)
                }
        },
        canDrop: (item: any) => {
            let tempArr = []
            if (item.id){
                tempArr = movies.filter(elem => elem.id !== item.id)
            } else {
                tempArr = [...movies]
            }
            const begin = tempArr.some(elem => elem.left < def && (elem.left + elem.width) > def)
            const end = tempArr.some(elem => elem.left < (def + item.dur / 2) && (elem.left + elem.width) > (def + item.dur / 2))
            if (!begin && !end) {
                return true
            } else {
                return false
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    })
    useEffect(() => {
        setMovie(hallMovies.movies)
    }, [hallMovies.movies])
    
    return (
        <div className="conf-step__seances-hall" ref={boxRef}>
            <h3 className="conf-step__seances-title">{hallTitle}</h3>
            <div className="conf-step__seances-timeline" ref={dropRef}>
                {movies.length && movies.map(movie => <Movie key={movie.id} movie={movie} />)}
                {isOver && 
                <div className="conf-step__seances-movie-start-drag" style={{left: def - 14, color: canDrop ? 'green' : 'red'}}>
                    { ("0" + String(Math.floor(def / 30))).slice(-2) + ":" + ("0" + String((def * 2) % 60)).slice(-2)}
                </div>}
            </div>
        </div>
    )
}