import React, {useState} from "react";

function Login({onLogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onLogin(password, email);
    }

    return (

        <form className="authorizations" onSubmit={handleSubmit}>
            <p className="authorizations__title">Вход</p>
            <label>
                <input
                    className="authorizations__input"
                    placeholder="Email"
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
            <button className="authorizations__button">Войти</button>

        </form>
    )

}

export default Login;