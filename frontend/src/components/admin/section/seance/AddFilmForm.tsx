import { useState, ChangeEvent } from "react";

export interface AddFilm {
    title: string,
    description: string,
    duration: number,
    country: string,
    urlImg: string
}
const initialState: AddFilm = {
    title: '',
    description: '',
    duration: 0,
    country: '',
    urlImg: ''
}
const initialCheck = {
    title: true,
    description: true,
    duration: true,
    country: true,
    urlImg: true
}
interface AddFilmProps {
    addHandler: (data: AddFilm | undefined) => void
}

export const AddFilmForm = ({addHandler}: AddFilmProps) => {
    const [inputValue, setInputValue] = useState(initialState);
    const [checkValue, setCheckValue] = useState(initialCheck);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let {name, value} = e.target;
        const check = value.trim() === '' ?  false : true;
        setInputValue((prev) => ({...prev, [name]: value}))
        setCheckValue((prev) => ({...prev, [name]: check}))
    }
    const onChangeDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const check = e.target.value.trim() === '' ?  false : true;
        setInputValue((prev) => ({...prev, description: e.target.value}))
        setCheckValue((prev) => ({...prev, description: check}))
    }
    const onChangeDuration = (e: ChangeEvent<HTMLInputElement>) => {
        let value = +e.target.value;
        value = isNaN(value) ? 0 : value;
        const check = value === 0 ?  false : true;
        setInputValue((prev) => ({...prev, duration: value}))
        setCheckValue((prev) => ({...prev, duration: check}))
    }

    const onClose = () => {
        addHandler(undefined);
        setInputValue(initialState);
        setCheckValue(initialCheck)
    }

    const checkFields = () => {
        const temp: any = {};
        let key: keyof typeof inputValue;
        for ( key in inputValue) {
                if (key === 'duration'){
                    if (inputValue[key] === 0) {
                        temp[key] = false;
                    }
                } else {
                    if (!inputValue[key]) {
                        temp[key] = false;
                    }
                }
        }
        const objEmty = Object.keys(temp).length > 0 ? false : true;
        setCheckValue((prev) => ({...prev, ...temp}))
        return objEmty;
    }

    const onAdd = () => {
        const check = checkFields();
        if (!check) {
            return;
        }        
        addHandler(inputValue);
        setInputValue(initialState);
        setCheckValue(initialCheck);
    }

    return (
        <div className="popup active">
            <div className="popup__dismiss" onClick={onClose}>x</div>
            <div className="popup__content">                
                <div className="popup__header">
                    <div className="popup__title">Добавить фильм</div>
                </div>
                <div className="popup__wrapper">
                    <div className="popup__container">
                        <div className="popup__form">
                            <label>
                                <p>Название фильма</p>
                                <input type="text" name="title" onChange={onChangeHandler} value={inputValue.title} style={{borderColor: checkValue.title ? '#b7b7b7' : 'red'}}/>
                            </label>
                            <label>
                                <p>Описание фильма</p>
                                <textarea name="description" id="" rows={5}  onChange={onChangeDesc} value={inputValue.description} style={{borderColor: checkValue.description ? '#b7b7b7' : 'red'}}></textarea>
                            </label>
                            <label>
                                <p>Продолжительность в минутах</p>
                                <input type="text" name="duration" onChange={onChangeDuration} value={inputValue.duration} style={{borderColor: checkValue.duration ? '#b7b7b7' : 'red'}}/>
                            </label>
                            <label>
                                <p>Страна</p>
                                <input type="text" name="country" onChange={onChangeHandler} value={inputValue.country} style={{borderColor: checkValue.country ? '#b7b7b7' : 'red'}}/>
                            </label>
                            <label>
                                <p>URL постера</p>
                                <input type="text" name="urlImg" onChange={onChangeHandler} value={inputValue.urlImg} style={{borderColor: checkValue.urlImg ? '#b7b7b7' : 'red'}}/>
                            </label>
                            <fieldset className="conf-step__buttons text-center">
                                <button className="conf-step__button conf-step__button-regular" onClick={() => setInputValue(initialState)}>Отмена</button>
                                <input type="button" value="Добавить" className="conf-step__button conf-step__button-accent" onClick={onAdd}/>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}