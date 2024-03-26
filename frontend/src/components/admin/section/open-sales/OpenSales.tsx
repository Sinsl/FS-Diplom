import { useEffect, useState } from "react";
import { requests } from "../../requests";


export const OpenSales = () => {
    const [isOpenSales, setIsOpenSales] = useState(true);

    const changeOpenSales = async (value: boolean) => {
        const response = await requests('put', `/admin/halls/change-open`, {is_open: value});
        if (response) {
            // console.log(response.data)
            setIsOpenSales(value);
        }
    }

    const onChange = () => {
        changeOpenSales(!isOpenSales);
    }

    useEffect(() => {
        if (isOpenSales) {
            changeOpenSales(false);
        }
    }, [])

    return (
        <section className="conf-step">
            <header className="conf-step__header conf-step__header_opened">
                <h2 className="conf-step__title">Открыть продажи</h2>
            </header>
            <div className="conf-step__wrapper text-center">
                <p className="conf-step__paragraph">{isOpenSales ? 'Продажа билетов открыта' : 'Всё готово, теперь можно:'}</p>
                <button 
                    className="conf-step__button conf-step__button-accent"
                    onClick={onChange}
                >
                        {isOpenSales ? 'Приостановить продажу билетов' : 'Открыть продажу билетов'}
                </button>
            </div>
        </section>
    )
} 