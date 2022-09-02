import React from "react";

function ImagePopup({card, onClose}) {

    const cardExists = !!card;

    return (
        <div className={`popup popup-open-card popup_overlay-open-card ${cardExists && `popup_opened`}`}>
            <div className="open-card-viewing">
                <img className="open-card-viewing__image"
                     src={`${cardExists && card.link}`}
                     alt={`${cardExists && card.name}`}/>
                <p className="open-card-viewing__subtitle">{`${cardExists && card.name}`}</p>
                <button type="button" className="popup__close-button" onClick={onClose}/>
            </div>
        </div>
    )
}

export default ImagePopup;