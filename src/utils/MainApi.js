class MainApi {

    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _handleResponse = res => {
        return (res.ok) ? res.json() : Promise.reject(
            {
                errorCode: res.status,
                errorText: res.statusText
            });
    }

    loadUserInfo = async () => {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.jwt}`,
            },
        });
        return this._handleResponse(res);
    }

    loadUserLists = async () => {
        const res = await fetch(`${this._baseUrl}/lists`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.jwt}`,
            },
        });
        return this._handleResponse(res);
    }

    loadList = async (listId) => {
        const res = await fetch(`${this._baseUrl}/lists/${listId}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.jwt}`,
            },
        });
        return this._handleResponse(res);
    }

    createList = async (listName) => {
        const res = await fetch(`${this._baseUrl}/lists`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.jwt}`,
            },
            body: JSON.stringify({
                name: listName
            }),
        });
        return this._handleResponse(res);
    }

    deleteList = async (listId) => {
        const res = await fetch(`${this._baseUrl}/lists/${listId}`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.jwt}`,
            },
        });
        return this._handleResponse(res);
    }

    updateList = async (listId, name) => {
        const res = await fetch(`${this._baseUrl}/lists/${listId}`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.jwt}`,
            },
            body: JSON.stringify({
                name: name,
            }),
        });
        return this._handleResponse(res);
    }

    updateUserAvatar = async (image) => {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.jwt}`,
            },
            body: JSON.stringify({
                image: image
            }),
        });
        return this._handleResponse(res);
    }

    updateUserName = async (name) => {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.jwt}`,
            },
            body: JSON.stringify({
                name: name
            }),
        });
        return this._handleResponse(res);
    }

    createItem = async (listId, name) => {
        const res = await fetch(`${this._baseUrl}/lists/${listId}/items`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.jwt}`,
            },
            body: JSON.stringify({
                name: name,
            }),
        });
        return this._handleResponse(res);
    }

    updateItem = async (listId, item) => {
        const res = await fetch(`${this._baseUrl}/lists/${listId}/items`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.jwt}`,
            },
            body: JSON.stringify({
                itemId: item._id,
                name: item.name,
                quantity: item.quantity,
                category: item.category,
                checked: item.checked
            }),
        });
        return this._handleResponse(res);
    }

    deleteItem = async (listId, itemId) => {
        console.log(listId, itemId);
        const res = await fetch(`${this._baseUrl}/lists/${listId}/items`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.jwt}`,
            },
            body: JSON.stringify({
                itemId: itemId
            }),
        });
        return this._handleResponse(res);
    }

}

const api = new MainApi({
    baseUrl: 'https://api.shopit.students.nomoredomainssbs.ru',
});

export default api;