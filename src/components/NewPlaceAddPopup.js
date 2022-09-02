import React, {useState} from "react";
import PopupWithForm from "./PopupWithForm";

function NewPlaceAddPopup({isOpen, onClose, onAddPlace}) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            name: name,
            link: link,
        });
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            name={'card'}
            formName={'card-new'}
            title={'Новое место'}
            buttenTitle={'Сохранить'}
            onSubmit={handleSubmit}
        >
            <label className="popup__fields">
                <input id="input-name"
                       type="text"
                       className="popup__field popup__field_input-name"
                       placeholder="Название"
                       value={name}
                       minLength="2"
                       maxLength="30"
                       onChange={handleChangeName}
                       required/>
                <span className="input-name-error popup__error"/>
            </label>
            <label className="popup__fields">
                <input id="input-link"
                       type="url"
                       className="popup__field popup__field_input-link"
                       placeholder="Ссылка на картинку"
                       value={link}
                       onChange={handleChangeLink}
                       required/>
                <span className="input-link-error popup__error"/>
            </label>

        </PopupWithForm>
    )

}

export default NewPlaceAddPopup;