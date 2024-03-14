import { useEffect, useState, SyntheticEvent } from "react";
import { SeatsAdmin } from "../../../../types/types";
import {ModalSelect} from "./ModalSelect"

interface SeatProp {
    seat: SeatsAdmin;
    changeCat: (id: number, cat: string) => void
}

const initialState = ['conf-step__chair'];

export const Seat = ({seat, changeCat}: SeatProp) => {
    const [seatClass, setSeatClass] = useState<string[]>(initialState);
    const [openModal, setOpenModal] = useState(false);
    const [left, setLeft] = useState(0); 

    useEffect(() => {
        let currentCatClass = '';
        if (!seat.active) {
            currentCatClass = 'conf-step__chair_disabled';                           
        } else {
            currentCatClass = seat.category_seats.title === 'simple' ? 'conf-step__chair_standart' : 'conf-step__chair_vip'; 
        }
        setSeatClass([...initialState, currentCatClass]);

    }, [seat]);

    const selectSeat = (e: SyntheticEvent) => {
        const target: any = e.target;
        setOpenModal(true);
        setLeft(target.offsetLeft - 50)
    }

    const selectHandler = (select: string) => {
        changeCat(seat.id, select);
        setOpenModal(false);
    }
    return (
        <>
            <span className={seatClass.join(' ')} onClick={selectSeat} data-id={seat.id}></span>  
            {openModal && <ModalSelect current={seatClass[1]} selectClick={selectHandler} left={left}/>}
        </>
        
    )
}