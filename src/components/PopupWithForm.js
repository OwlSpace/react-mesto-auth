import React from "react";

function PopupWithForm({name, formName, title, children, isOpen, buttenTitle, onClose, onSubmit}) {

    return (

        <div className={`popup popup-${name} ${isOpen && `popup_opened`}`}>
            <form name={`${formName}`} className="popup__form" onSubmit={onSubmit}>
                <fieldset className="popup__section">
                    <p className="popup__title">{title}</p>
                    {children}
                    <button type="submit" className="popup__save-button">{buttenTitle}</button>
                </fieldset>
                <button type="button" className="popup__close-button" onClick={onClose}/>
            </form>
        </div>

    )

}

export default PopupWithForm;