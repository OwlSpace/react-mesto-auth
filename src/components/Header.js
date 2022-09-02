import logotip from "../images/logotip.svg";
import React, {useState} from "react";
import {Link, useLocation} from 'react-router-dom';

function Header({emailUser}) {
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(false);
    const email = <p className="navbar__title">{location.pathname === '/react-mesto-auth' && emailUser}</p>;
    const asd = <Link className="navbar__link" to={location.pathname === "/sign-up"
        ? "/sign-in"
        : location.pathname === "/sign-in"
            ? "/sign-up"
            : "/sign-in"}>
        {
            location.pathname === "/sign-up"
                ? "Войти"
                : location.pathname === "/sign-in"
                ? "Регистрация"
                : "Выйти"
        }
    </Link>;

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
                {email}
                {asd}
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
                            {email}
                            {asd}
                        </div>
                    </div>
                </nav>
            </div>
            <div className="header__line"/>
        </header>
    )
}

export default Header;
