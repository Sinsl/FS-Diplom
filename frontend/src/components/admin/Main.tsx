import './admin.css';
import { ControlHalls } from './section/control/ControlHalls';
import { ConfigHalls } from './section/config/ConfigHalls';
import { ConfigPrice } from './section/price/ConfigPrice';
import { SeanсeGrid } from './section/seance/SeanсeGrid';
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from './redux/store/store';
import { useEffect, useState } from 'react';
import { changeAuth } from "../admin/redux/slices/authSlice";
import { useNavigate } from 'react-router-dom';
import { requests } from './requests';


export const Main = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    

    useEffect(() => {
        const getUserName = async () => {
            const response = await requests('get', `/admin/user`, null);
            if (response && response.data) {
                setUserName(response.data.name)
            }
        }
        if(!token) {
            const tokenStorage = localStorage.getItem('token');
            if(tokenStorage) {
                dispatch(changeAuth(tokenStorage))
            } else {
                navigate('/auth')
            }
        } else {
            getUserName();
        }
    }, [token])

    const logout = () => {
        localStorage.removeItem('token');
        setUserName('');
        dispatch(changeAuth(''))
    }

    return (
        <>

            <header className="page-header admin">
                <div>
                    <h1 className="page-header__title">Идём<span>в</span>кино</h1>
                    <span className="page-header__subtitle">Администраторррская</span>
                </div>
                <div className='page-header__user'>
                    {userName && <span className='user'>{userName}</span>}
                    <span className='logout' onClick={logout}>Выход</span>
                </div>
            </header>

            <main className="conf-steps">
                <ControlHalls />
                <ConfigHalls />
                <ConfigPrice />
                <SeanсeGrid/>
            </main>
        </>
    )
}