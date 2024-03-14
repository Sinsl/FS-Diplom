import { useEffect, useState } from "react";
import { ElemDateType } from '../../../types/types';
import { NavItem } from "./NavItem";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { useDispatch } from "react-redux";
import { setActivDay } from '../redux/slices/selectedDaySlice';


export const NavPage = () => {
    const { selectedDay } = useSelector((state: RootState) => state.selectedDay);
    const dispatch = useDispatch();
    let size = 6;
    const [arrDate, setArrDate] = useState<ElemDateType[]>([]);
    const [startDate, setStartDay] = useState(Date.now());


    const renderDate = () => {
        if (selectedDay < startDate) {
            dispatch(setActivDay(startDate))
            return
        }
        const arrTemp: ElemDateType[] = [];
        let current = startDate;
        while (size > 0) {
            let is_now = false;
            const tempDate = new Date(current);
            if (tempDate.getDate() === new Date().getDate()) {
                is_now = true
            }
            arrTemp.push({date: tempDate, is_now, is_active: false});
            size -= 1;
            current += (24 * 60 * 60 * 1000);
        }
        const elem = arrTemp.find(el => el.date.getDate() === new Date(selectedDay).getDate())
        if (elem) {
            elem.is_active = true;
        }        
        setArrDate(arrTemp);
    }

    useEffect(() => {
        renderDate();
    }, [selectedDay, startDate])

    const onClickNext = () => {
        setStartDay(startDate + (24 * 60 * 60 * 1000));
    }

    return (
        <nav className="page-nav">
            {arrDate.map((elem) => 
            <NavItem 
                key={new Date(elem.date).toLocaleDateString()} 
                itemDate={elem}
            />)}            
            <div className="page-nav__day page-nav__day_next" onClick={onClickNext}></div>
        </nav>
    )
}