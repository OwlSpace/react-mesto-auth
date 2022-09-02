import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onApprovalCardDelet }) {

    const { link, name, likes, owner:{_id: ownerId} } = card;
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = ownerId === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn && 'element__delete-button_active'}`
    );
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like-button ${isLiked && 'element__like-button_active'}`;

    function handleImageClick() {
        onCardClick(card);
    }
    
    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onApprovalCardDelet(card);
    }

    return (

        <li className="element">
            <img src={link} alt={name} className="element__image" onClick={handleImageClick}/>
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}/>
            <div className="element__container">
                <h2 className="element__title">{name}</h2>
                <div className="element__container-like">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
                    <span className="element__like-count">{likes.length}</span>
                </div>
            </div>
        </li>

    )

}

export default Card;