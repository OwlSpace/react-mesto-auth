import React from "react";

function FormLoginOrRegister({onSubmit, title, onEmail, email, onPassword, password, buttonName, children}) {

    return (
        <form className="authorizations" onSubmit={onSubmit}>
            <p className="authorizations__title">{title}</p>
            <label>
                <input
                    className="authorizations__input"
                    placeholder="Email"
                    value={email || ''}
                    minLength="2"
                    maxLength="30"
                    onChange={onEmail}
                />
            </label>
            <label>
                <input
                    className="authorizations__input"
                    placeholder="Пароль"
                    value={password || ''}
                    type="password"
                    minLength="4"
                    maxLength="15"
                    onChange={onPassword}
                />
            </label>
            <button className="authorizations__button">{buttonName}</button>
            {children}
        </form>
    )

}

export default FormLoginOrRegister;