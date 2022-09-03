import React, {useState} from "react";
import FormLoginOrRegister from "./FormLoginOrRegister";

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
        <FormLoginOrRegister
            onSubmit={handleSubmit}
            title={'Вход'}
            onEmail={handleEmailChange}
            email={email}
            onPassword={handlePasswordChange}
            password={password}
            buttonName={'Войти'}
        >
        </FormLoginOrRegister>
    )

}

export default Login;