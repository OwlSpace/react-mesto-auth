import React, {useState} from "react";
import FormLoginOrRegister from "./FormLoginOrRegister";

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

        <FormLoginOrRegister
            onSubmit={handleSubmit}
            title={'Регистрация'}
            onEmail={handleEmailChange}
            email={email}
            onPassword={handlePasswordChange}
            password={password}
            buttonName={'Зарегистрироваться'}
        >
            <a className="authorizations__link" href='/sign-in'>Уже зарегистрированы?Войти</a>
        </FormLoginOrRegister>

    )

}

export default Register;