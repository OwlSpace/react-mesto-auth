import React from "react";
import PopupWithForm from "./PopupWithForm";

function ApprovalPopup({isOpen, onClose, onCardDelete}) {

    function handleSubmit(e) {
        e.preventDefault();
        onCardDelete();
    }

    return (

        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name={'approval'}
            formName={'approval'}
            title={'Вы уверены?'}
            buttenTitle={'Да'}
            buttenClass={'popup__save-button_confirmation'}
        >
            <div className='popup__save-button_confirmation'/>

        </PopupWithForm>
    )

}

export default ApprovalPopup;