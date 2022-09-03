import React, {useEffect, useState} from "react";
import {Route, Switch, useHistory} from 'react-router-dom';
import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditAvatar from "./EditAvatar";
import ProfilePopup from "./ProfilePopup";
import NewPlaceAddPopup from "./NewPlaceAddPopup";
import ImagePopup from "./ImagePopup";
import ApprovalPopup from "./ApprovalPopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as duckAuth from "./DuckAuth";

function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isApprovalPopup, setIsApprovalPopup] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({
            name: '',
            about: '',
            _id: '',
            avatar: '',
        }
    );
    const [cards, setCards] = useState([]);
    const [cardDelete, setCardDelete] = useState({});
    const [isInfoTooltip, setIsInfoTooltip] = useState(false);
    const [message, setMessage] = useState(false);
    const [emailUser, setEmailUser] = useState('');
    const history = useHistory();

    useEffect(() => {
        validToken();
    });

    useEffect(() => {
       if (loggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then(([infoProfile, cards]) => {
                    setCurrentUser(infoProfile);
                    setCards(cards);
                })
                .catch((err) => console.log(err));
        }
    }, [loggedIn]);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleApprovalPopup(card) {
        setCardDelete(card);
        setIsApprovalPopup(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false)
        setIsApprovalPopup(false);
        setIsInfoTooltip(false);
        setSelectedCard(null);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((whoIsLike) => whoIsLike._id === currentUser._id);

        api.toggleLike(card._id, isLiked)
            .then((newCard) => {
                    setCards((state) => state.map((cardState) => cardState._id === card._id ? newCard : cardState)
                    );
                }
            )
            .catch((err) => console.log(err))
    }

    function handleCardDelete() {
        api.deleteCard(cardDelete._id)
            .then(() => {
                    setCards(
                        cards.filter((cardState) => cardState._id !== cardDelete._id)
                    );
                    closeAllPopups();
                }
            )
            .catch((err) => console.log(err))
    }

    function handleUpdateUser(data) {
        api.editProfileData(data)
            .then((res) => {
                    setCurrentUser({
                            ...currentUser,
                            name: res.name,
                            about: res.about,
                        }
                    );
                    closeAllPopups();
                }
            )
            .catch((err) => console.log(err))
    }

    function handleUpdateAvatar(avatarLink) {
        api.editAvatar(avatarLink)
            .then((res) => {
                    setCurrentUser({
                            ...currentUser,
                            avatar: res.avatar
                        }
                    );
                    closeAllPopups();
                }
            )
            .catch((err) => console.log(err))
    }

    function handleAddPlaceSubmit(data) {
        api.addingNewCard(data)
            .then((res) => {
                    setCards([res, ...cards]);
                    closeAllPopups();
                }
            )
            .catch((err) => console.log(err))

    }

    function login(password, email) {
        duckAuth.authorization(password, email)
            .then((res) => {
                    setLoggedIn(true);
                    setEmailUser(email);
                    history.push('/react-mesto-auth');
                    localStorage.setItem('jwt', res.token);
                }
            )
            .catch(() => {
                    setMessage(false);
                    setIsInfoTooltip(true);
                }
            );
    }

    function regist(password, email) {
        duckAuth.register(password, email)
            .then(() => {
                    setIsInfoTooltip(true);
                    setMessage(true);
                    history.push('/sign-in');
                }
            )
            .catch(() => {
                    setMessage(false);
                    setIsInfoTooltip(true);
                }
            );
    }

    function validToken() {
        const token = localStorage.getItem('jwt');
        if (token) {
            duckAuth.token(token)
                .then((res) => {
                        setEmailUser(res.data.email);
                        setLoggedIn(true);
                        history.push('/react-mesto-auth');
                    }
                )
                .catch((error) => {
                        console.log(error)
                    }
                );
        }

    }

    function userLogout() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        history.push('/sign-in');
    }

    return (
        <div className="App">

            <CurrentUserContext.Provider value={currentUser}>

                <Header
                    emailUser={emailUser}
                    userLogout={userLogout}
                    history={history}
                />

                <Switch>
                    <ProtectedRoute
                        exact path='/react-mesto-auth'
                        component={Main}
                        loggedIn={loggedIn}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onApprovalCardDelet={handleApprovalPopup}
                        cards={cards}
                    />

                    <Route path='/sign-in'>
                        <Login
                            onLogin={login}
                        />
                    </Route>

                    <Route path='/sign-up'>
                        <Register
                            onRegister={regist}
                        />
                    </Route>

                </Switch>

                <EditAvatar
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <ProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <NewPlaceAddPopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />
                <ApprovalPopup
                    isOpen={isApprovalPopup}
                    onClose={closeAllPopups}
                    onCardDelete={handleCardDelete}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
                <InfoTooltip
                    isOpen={isInfoTooltip}
                    onClose={closeAllPopups}
                    status={message}
                />

                <Footer/>

            </CurrentUserContext.Provider>

        </div>
    );
}

export default App;