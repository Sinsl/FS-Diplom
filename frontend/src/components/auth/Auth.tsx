import { useEffect, useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import { requests } from "../admin/requests";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from '../admin/redux/store/store';
import { changeAuth } from "../admin/redux/slices/authSlice";
import { useNavigate } from 'react-router-dom';


export interface dataUser {
    name?: string,
    email: string,
    password: string
}

export interface authProps {
    submitHandler: (data: dataUser) => void
}

export const Auth = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const [isLogin, setIsLogin] = useState(true);
    const [isMsg, setIsMsg] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!token) {
            const tokenStorage = localStorage.getItem('token');
            if (tokenStorage) {
                dispatch(changeAuth(tokenStorage))
                navigate('/admin')
            }
        }
    }, [token])

    const onSubmitHandler = async (data: dataUser) => {
        const url = isLogin ? 'token' : 'register';
        const response = await requests('post', '/sunctum/' + url, {...data, device_name: 'desktop'})
        if (response && response.data) {
            if (isLogin) {
                localStorage.setItem('token', response.data.token);
                dispatch(changeAuth(response.data.token));                
                navigate('/admin')
            } else {
                setIsLogin(true);
                setIsMsg(true);
                setTimeout(() => {
                    setIsMsg(false);
                }, 2000);
            }

        }
        
    }


    return (
        <div>
            <header className="page-header auth">
                <div>
                    <h1 className="page-header__title">Идём<span>в</span>кино</h1>
                    <span className="page-header__subtitle">Администраторррская</span>
                </div>
                <div className='page-header__user'></div>
            </header>
            <main>
                <section className="login">
                    <header className="login__header">
                        <h2 className={`login__title ${isLogin && 'active'}`}  onClick={() => setIsLogin(!isLogin)}>Авторизация</h2>
                        <h2 className={`login__title ${!isLogin && 'active'}`}  onClick={() => setIsLogin(!isLogin)}>Регистрация</h2>
                    </header>
                    <div className="login__wrapper">
                        {isLogin ? <Login submitHandler={onSubmitHandler}/> : <Register submitHandler={onSubmitHandler}/>}
                    </div>
                    <div className="msg-auth">{isMsg && "Успешная регистрация. Пожалуйста авторизируйтесь!"}</div>
                </section>
            </main>
        </div>
    )
}