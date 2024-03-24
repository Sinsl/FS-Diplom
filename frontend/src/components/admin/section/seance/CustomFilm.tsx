import { useDragLayer } from 'react-dnd'

interface Offset {
    x: number,
    y: number
}

export const CustomFilm = () => {
    const { isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => 
    ({
        item: monitor.getItem(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }))

    function getItemStyles(initialOffset: Offset | null, currentOffset: Offset | null, dur: number, color: string) {
        if (!initialOffset || !currentOffset) {
            return { display: 'none', }
        }

        let { x, y } = currentOffset;
        return {
            left: x + 48,
            top: y,
            width: dur / 10 * 5,
            backgroundColor: color
        }
    }

    // console.log(initialOffset, currentOffset)
    
    return (
        <>
        {isDragging &&
            <div className='drag' style={getItemStyles(initialOffset, currentOffset, item.dur, item.bg_color)}>
                <div className='drag-title'>{item.title}</div>
            </div> 
        }
        </>
        
                 
    )
}