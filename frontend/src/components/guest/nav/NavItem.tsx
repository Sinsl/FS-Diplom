import { week } from './week';
import { NavItemProp } from '../../../types/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store/store';
import { setActivDay } from '../redux/slices/selectedDaySlice';


export const NavItem = ({ itemDate}: NavItemProp) => {
    const dispatch: AppDispatch = useDispatch();
    let strClassName = "page-nav__day";
    if (itemDate.is_now) {
        strClassName += " page-nav__day_today";
    }
    if (itemDate.is_active) {
        strClassName += " page-nav__day_chosen";
    }
    if (itemDate.date.getDay() === 0 || itemDate.date.getDay() === 6) {
        strClassName += " page-nav__day_weekend"
    }
    const clickHandler = () => {
        dispatch(setActivDay(itemDate.date.getTime()))
    }

    return (
        <div className={strClassName} onClick={clickHandler}>
            <span className='page-nav__day-week'>{week[itemDate.date.getDay()]}</span>
            <span className="page-nav__day-number">{itemDate.date.getDate()}</span>
        </div>
    )
}