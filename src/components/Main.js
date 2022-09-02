import React, {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onCardClick, onEditAvatar, onEditProfile, onAddPlace, onCardLike, onApprovalCardDelet, cards}) {

    const currentUser = useContext(CurrentUserContext);
    const cardsElements = cards.map((card, id) =>
        (
            <Card
                key={id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onApprovalCardDelet={onApprovalCardDelet}
            />
        )
    );

    return (
        <main>

            <section className="profile">
                <img src={currentUser.avatar}
                     alt="фото_пользователя"
                     className="profile__avatar"
                     onClick={onEditAvatar}
                />
                <div className="info-user">
                    <h1 className="info-user__name">{currentUser.name}</h1>
                    <button type="button" className="info-user__edit-button" onClick={onEditProfile}></button>
                    <p className="info-user__job">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
            </section>

            <section className="elements">
                <ul className="elements__list">
                    {cardsElements}
                </ul>
            </section>

        </main>
    )

}

export default Main;