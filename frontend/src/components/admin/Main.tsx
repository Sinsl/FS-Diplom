import './admin.css';
import { ControlHalls } from './section/control/ControlHalls';
import { ConfigHalls } from './section/config/ConfigHalls';
import { ConfigPrice } from './section/price/ConfigPrice';


export const Main = () => {
    return (
        <div>

            <header className="page-header">
                <h1 className="page-header__title">Идём<span>в</span>кино</h1>
                <span className="page-header__subtitle">Администраторррская</span>
            </header>

            <main className="conf-steps">
                <ControlHalls />
                <ConfigHalls />
                <ConfigPrice />
            </main>
        </div>
    )
}