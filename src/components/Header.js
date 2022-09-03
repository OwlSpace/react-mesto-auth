import logotip from "../images/logotip.svg";
import React, {useState} from "react";
import {useLocation} from 'react-router-dom';

function Header({emailUser, userLogout, history}) {

    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(false);

    function outputHandler() {
        if (history.location.pathname === "/sign-in") {
            history.push('/sign-up');
        } else if (history.location.pathname === "/sign-up") {
            history.push('/sign-in');
        } else {
            userLogout();
        }
    }

    function hambHandler(e) {
        e.preventDefault();
        if (openMenu) {
            setOpenMenu(false);
        } else {
            setOpenMenu(true);
        }
    }

    return (
        <header className="header">
            <div className={`header__popup-menu  ${openMenu && `header__popup-menu_open`}`}>
                <p className="navbar__title">{history.location.pathname === '/react-mesto-auth' && emailUser}</p>
                <button className="navbar__button-link" type='button' onClick={outputHandler}>
                    {location.pathname === "/sign-up"
                        ? "Войти"
                        : location.pathname === "/sign-in"
                            ? "Регистрация"
                            : "Выйти"}
                </button>
                <div className="header__line header__line_small"/>
            </div>
            <div className="header__container">
                <img src={logotip} alt="логотип" className="header__logo"/>
                <nav className="navbar">
                    <div className="navbar__container">
                        <div className={`navbar__hamb ${openMenu && `navbar__hamb_active`}`}
                             onClick={hambHandler}>
                            <span className="navbar__bar"/>
                            <span className="navbar__bar"/>
                            <span className="navbar__bar"/>
                        </div>
                        <div className="navbar__menu">
                            <p className="navbar__title">{history.location.pathname === '/react-mesto-auth' && emailUser}</p>
                            <button className="navbar__button-link" type='button' onClick={outputHandler}>
                                {location.pathname === "/sign-up"
                                    ? "Войти"
                                    : location.pathname === "/sign-in"
                                        ? "Регистрация"
                                        : "Выйти"}
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="header__line"/>
        </header>
    )
}

export default Header;
