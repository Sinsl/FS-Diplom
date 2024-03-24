

export const Register = () => {
    return (
        <>
            <header className="page-header">
                <h1 className="page-header__title">Идём<span>в</span>кино</h1>
                <span className="page-header__subtitle">Администраторррская</span>
            </header>
            
            <main>
                <section className="login">
                <header className="login__header">
                    <h2 className="login__title">Регистрация</h2>
                </header>
                <div className="login__wrapper">
                    <form className="login__form">
                    <label className="login__label">
                        Имя
                        <input className="login__input" type="text"  name="name" required />
                    </label>
                    <label className="login__label">
                        E-mail
                        <input className="login__input" type="email" placeholder="example@domain.xyz" name="email" required />
                    </label>
                    <label className="login__label">
                        Пароль
                        <input className="login__input" type="password" placeholder="" name="password" required />
                    </label>
                    <div className="text-center">
                        <input value="Авторизоваться" type="button" className="login__button" />
                    </div>
                    </form>
                </div>
                </section>
            </main>
        </>
    )
}