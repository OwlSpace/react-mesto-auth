import React, {useState} from "react";

function Register({onRegister}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(password, email);
    }

    return (
        <form className="authorizations" onSubmit={handleSubmit}>
            <p className="authorizations__title">Регистрация</p>
            <label>
                <input
                    className="authorizations__input"
                    placeholder="Email"
                    type="email"
                    minLength="2"
                    maxLength="30"
                    onChange={handleEmailChange}
                />
            </label>
            <label>
                <input
                    className="authorizations__input"
                    placeholder="Пароль"
                    type="password"
                    minLength="4"
                    maxLength="15"
                    onChange={handlePasswordChange}
                />
            </label>
            <button className="authorizations__button">Зарегистрироваться</button>
            <a className="authorizations__link" href='/sign-in'>Уже зарегистрированы?Войти</a>
        </form>
    )

}

export default Register;