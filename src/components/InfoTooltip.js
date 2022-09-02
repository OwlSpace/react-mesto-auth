import React from 'react';
import successIcon from '../images/iconOk.png';
import errorIcon from '../images/iconError.png';

function InfoTooltip({isOpen, status, onClose}) {

    return (
        <div className={`popup popup_info-tooltip ${isOpen ? 'popup_opened' : ''}`}>
            <form className="popup__form">
                <fieldset className="popup__section">
                    <img className="popup__image" alt="статус ответа" src={status ? successIcon : errorIcon}/>
                    <p className="popup__title-info-tooltip">
                        {status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
                    </p>
                    <button type="button" className="popup__close-button" onClick={onClose}/>
                </fieldset>
            </form>
        </div>
    )
}

export default InfoTooltip;