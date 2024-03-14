import { useEffect, useState } from "react";
import { Seats } from "../../../types/types";

interface SeatProp {
    seat: Seats;
    isOccupied: boolean;
    selected: (seatId: number) => void
}

const initialState = ['buying-scheme__chair'];

export const Seat = ({seat, isOccupied, selected}: SeatProp) => {
    const [seatClass, setSeatClass] = useState<string[]>(initialState);

    useEffect(() => {
        if (seat.active) {
            let currentCatClass = '';
            if (isOccupied) {
                currentCatClass = 'buying-scheme__chair_taken';
            } else {
                currentCatClass = seat.category_seats.title === 'simple' ? 'buying-scheme__chair_standart' : 'buying-scheme__chair_vip';
            }
            setSeatClass(item => [...item, currentCatClass]);
        } else {
            setSeatClass([...initialState, 'buying-scheme__chair_disabled']);
        }
    }, [seat, isOccupied]);

    const selectSeat = () => {
        if (!isOccupied){
            if (seatClass.includes('buying-scheme__chair_selected')){
                setSeatClass(seatClass.filter(item => item !== 'buying-scheme__chair_selected'));
            } else {
                setSeatClass(item => [...item, 'buying-scheme__chair_selected']);
            }
            selected(seat.id);
        }        
    }

    return (
        <span className={seatClass.join(' ')} onClick={selectSeat}></span>
    )
}