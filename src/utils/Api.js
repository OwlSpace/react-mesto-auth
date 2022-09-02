class Api {
    constructor({serverUrl, token}) {
        this._baseUrl = serverUrl;
        this._token = token;
    }

    _requestResult(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(
                `Ошибка ${res.status} - ${res.statusText}`
            );
        }
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => this._requestResult(res));
    }

    editAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                avatar: data,
            }),
        }).then((res) => this._requestResult(res));
    }


    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => this._requestResult(res));
    }


    editProfileData(data) {
        return fetch(
            `${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify
                ({
                        name: data.name,
                        about: data.about
                    }
                )
            })
            .then((res) => this._requestResult(res));
    }


    addingNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link

            })
        })
            .then((res) => this._requestResult(res));
    }

    deleteCard(_id) {
        return fetch(`${this._baseUrl}/cards/${_id}`, {
            method: "DELETE",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            }
        })
            .then((res) => this._requestResult(res));
    }

    toggleLike(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? "DELETE" : "PUT",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            }
        })
            .then((res) => this._requestResult(res));
    }

}

const api = new Api({
    serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
    token: 'c8c62f37-61bd-465e-9fee-a35009eb7d26',
});

export default api;