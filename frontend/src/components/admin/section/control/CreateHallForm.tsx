import { useState } from "react";

interface FormProps {
    btnOkHandler: (data: string) => void,
    btnCancelHandler: () => void
}


export const CreateHallForm = ({ btnOkHandler, btnCancelHandler }: FormProps) => {
    const [input, setInput] = useState('');


    const cancel = () => {
        setInput('');
        btnCancelHandler();
    }

    const submit = () => {
        if(input.trim()) {
            btnOkHandler(input);
        }         
        cancel();
    }

    
 
    return (
        <div className="conf-step_form_box">
            <form onSubmit={submit}>
                <p>Название зала:</p>
                <input type="text" name="title" value={input} onChange={(e) => setInput(e.target.value)}/>
                <div>
                    <button className="conf-step__button  conf-step__button-accent" type="submit">Создать зал</button>
                    <button className="conf-step__button  conf-step__button-accent" onClick={cancel}>Отмена</button>
                </div>
                
            </form>
        </div>
    )
}