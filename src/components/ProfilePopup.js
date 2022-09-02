import React, {useEffect, useContext, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function ProfilePopup({isOpen, onClose, onUpdateUser}) {

    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            name={'profile'}
            formName={'user-info'}
            title={'Редактировать профиль'}
            buttenTitle={'Сохранить'}
            onSubmit={handleSubmit}
        >
            <label className="popup__fields">
                <input id="input-title"
                       type="text"
                       value={name || ''}
                       onChange={handleChangeName}
                       className="popup__field popup__field_input-name"
                       minLength="2"
                       maxLength="40"
                       required/>
                <span className="input-title-error popup__error"/>
            </label>
            <label className="popup__fields">
                <input id="input-job"
                       type="text"
                       value={description || ''}
                       onChange={handleChangeDescription}
                       className="popup__field popup__field_input-job"
                       minLength="2"
                       maxLength="200"
                       required/>
                <span className="input-job-error popup__error"></span>
            </label>

        </PopupWithForm>
    )

}

export default ProfilePopup;