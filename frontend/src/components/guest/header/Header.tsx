import { Outlet } from "react-router-dom"

export const Header = () => {
    return (
        <>
        <header className="page-header home">
            <h1 className="page-header__title">Идём<span>в</span>кино</h1>
        </header>
        <Outlet/>
        </>
        
    )
}