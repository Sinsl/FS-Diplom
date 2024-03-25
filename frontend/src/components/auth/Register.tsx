import { useState, ChangeEvent } from "react";
import { dataUser, authProps } from "./Auth";

const initialState = {
    name: '',
    email: '',
    password: ''
 }
export const Register = ({submitHandler}: authProps) => {
    const [inputValue, setInputValue] = useState<dataUser>(initialState);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let {name, value} = e.target;
        setInputValue((prev) => ({...prev, [name]: value}))
    }

    const onSubmitHandler = async () => {
        submitHandler(inputValue);
    }
    return (
        <>
            <form className="login__form">
                <label className="login__label">
                    Имя
                    <input className="login__input" type="text"  name="name" required value={inputValue.name} onChange={changeHandler}/>
                </label>
                <label className="login__label">
                    E-mail
                    <input className="login__input" type="email" placeholder="example@domain.xyz" name="email" required value={inputValue.email} onChange={changeHandler}/>
                </label>
                <label className="login__label">
                    Пароль
                    <input className="login__input" type="password" placeholder="" name="password" required value={inputValue.password} onChange={changeHandler}/>
                </label>
            </form>
            <div className="text-center">
                <input value="Зарегистрироваться" type="button" className="login__button" onClick={onSubmitHandler}/>
            </div>
        </>
    )
}