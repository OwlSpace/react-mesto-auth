import React, {createRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatar({isOpen, onClose, onUpdateAvatar}) {

    const linkRef = createRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(linkRef.current.value);
    }

    React.useEffect(() => {
        linkRef.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            name={'update-avatar'}
            formName={'update-avatar'}
            title={'Обновить аватар'}
            buttenTitle={'Сохранить'}
            onSubmit={handleSubmit}
        >
            <label className="popup__fields">
                <input id="input-url"
                       type="url"
                       ref={linkRef}
                       className="popup__field popup__field_input-link"
                       placeholder="Ссылка на картинку"
                       required/>
                <span className="input-url-error popup__error"></span>
            </label>

        </PopupWithForm>
    )

}

export default EditAvatar;