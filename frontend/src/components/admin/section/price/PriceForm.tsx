
interface Values {
    simple: number,
    vip: number
}
interface PriceFormProps {
    valuesInputs: Values,
    changeInputs: (name: string, value: string) => void
}
export const PriceForm = ({valuesInputs, changeInputs}: PriceFormProps) => {
    return (
        <>
        <div className="conf-step__legend">
            <label className="conf-step__label">Цена, рублей
                <input 
                    type="text" 
                    className="conf-step__input" 
                    name="simple" 
                    value={String(valuesInputs.simple)} 
                    onChange={(e) => changeInputs(e.target.name, e.target.value)}
                />
            </label>
            за <span className="conf-step__chair conf-step__chair_standart"></span> обычные кресла
        </div>  
        <div className="conf-step__legend">
            <label className="conf-step__label">Цена, рублей
                <input 
                    type="text" 
                    className="conf-step__input" 
                    name="vip" 
                    value={String(valuesInputs.vip)}
                    onChange={(e) => changeInputs(e.target.name, e.target.value)}
                />
            </label>
            за <span className="conf-step__chair conf-step__chair_vip"></span> VIP кресла
        </div> 
        </>
    )
}