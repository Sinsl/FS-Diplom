import { useEffect, useState } from "react";
import { requests } from "../../requests";
import { CreateHallForm } from "./CreateHallForm";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from '../../redux/store/store';
import { fetchHalls } from "../../redux/slices/getHallsSlice";


export const ControlHalls = () => {
    
    const {halls, loading, error} = useSelector((state: RootState) => state.halls);
    const dispatch: AppDispatch = useDispatch();
    
    const [isOpen, setIsOpen] = useState(false);
    const [isCreateHall, setIsCreateHall] = useState(false);

    const clickOpen = () => setIsOpen(prev => !prev);

    useEffect(() => {
        if (isOpen) {
            if (halls.length === 0) {
                dispatch(fetchHalls());
            }            
        }        
    }, [isOpen])    

    const deleteHall = async (id: number) => {
        // console.log(id)
        try {
            const response = await requests('delete', '/admin/delete/hall/' + id, null);
            if (response) {
                dispatch(fetchHalls());
            }
        } catch (error) {
            console.log(error)
        }
    }

    const createHall = async (data: string) => {
        // console.log(data);
        try {
            const response = await requests('post', '/admin/create/hall', {title: data});
            if (response) {
                dispatch(fetchHalls());
            }
        } catch (error) {
            console.log(error)
        }
    }

    const cancelHall = () => {
        setIsCreateHall(false);
    }
    // console.log(halls)

    return (
        <section className="conf-step">
            <header className={`conf-step__header ${isOpen ? 'conf-step__header_opened' : 'conf-step__header_closed'}`}  onClick={clickOpen}>
                <h2 className="conf-step__title">Управление залами</h2>
            </header>
            <div className="conf-step__wrapper">
                <p className="conf-step__paragraph">Доступные залы:</p>
                <ul className="conf-step__list">
                    {!loading && halls.length > 0 && halls.map(hall => 
                        <li key={hall.id} data-id={hall.id}>{hall.title}
                            <button className="conf-step__button conf-step__button-trash" onClick={() => deleteHall(hall.id)}></button>
                        </li>
                    )}                    
                </ul>
                { loading && <p className="empty-msg">загрузка данных</p> }
                { error && <p className="error-msg">{error}</p> }
                {!isCreateHall && <button className="conf-step__button conf-step__button-accent" onClick={() => setIsCreateHall(true)}>Создать зал</button>}
                {isCreateHall && <CreateHallForm btnOkHandler={createHall} btnCancelHandler={cancelHall}/>}
            </div>
        </section>
    )
}