import { useState, useEffect } from "react";
import { HallBox } from "./HallBox";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from '../../redux/store/store';
import { fetchHalls } from "../../redux/slices/getHallsSlice";
import { changeSelect } from "../../redux/slices/selectedHallSlice";

export const ConfigHalls = () => {
    const {halls, loading, error} = useSelector((state: RootState) => state.halls);
    const {selectHall} = useSelector((state: RootState) => state.selectHall);
    const dispatch: AppDispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const clickOpen = () => setIsOpen(prev => !prev);

    useEffect(() => {
        if (isOpen) {
            if (halls.length === 0) {
                dispatch(fetchHalls());
            }
        }        
    }, [isOpen])

    useEffect(() => {
        if (halls.length > 0 && selectHall === 0) {
            dispatch(changeSelect(halls[0].id))
        }
    }, [halls])

    const selectClick = (id: number) => {
        dispatch(changeSelect(id))
    }


    return (
        <section className="conf-step">
            <header className={`conf-step__header ${isOpen ? 'conf-step__header_opened' : 'conf-step__header_closed'}`}  onClick={clickOpen}>
                <h2 className="conf-step__title">Конфигурация залов</h2>
            </header>
            <div className="conf-step__wrapper">
                <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
                {!loading && halls.length > 0 && 
                <ul className="conf-step__selectors-box">
                    {halls.map(hall => 
                        <li key={hall.id}
                            data-id={hall.id}
                            onClick={() => selectClick(hall.id)}
                        >
                            <span className={`conf-step__selector ${selectHall === hall.id ? 'active' : ''}`}>
                                {hall.title}
                            </span>
                        </li>
                    )}
                </ul> }
                { loading && <p className="empty-msg">загрузка данных</p> }
                { error && <p className="error-msg">{error}</p> }
                {selectHall > 0 && <HallBox hallId={selectHall}/>}
            </div>
        </section>
    )
}