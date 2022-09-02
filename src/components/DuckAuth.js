export const BASE_URL = 'https://auth.nomoreparties.co';

function requestResult(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(
            `Ошибка ${res.status} - ${res.statusText}`
        );
    }
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password, email})
        }
    )
        .then((res) => {
                return requestResult(res);
            }
        )

};


export const authorization = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password, email})
        }
    )
        .then((res) => {

                return requestResult(res)
            }
        )
};

export const token = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    )
        .then((res) => {
                return requestResult(res)
            }
        )
};
