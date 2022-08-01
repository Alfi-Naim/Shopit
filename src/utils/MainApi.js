class MainApi {

    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.jwt}`,
        }
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
            headers: this._headers
        });
        return this._handleResponse(res);
    }

    loadUserLists = async () => {
        const res = await fetch(`${this._baseUrl}/lists`, {
            method: 'GET',
            headers: this._headers
        });
        return this._handleResponse(res);
    }

    loadList = async (listId) => {
        const res = await fetch(`${this._baseUrl}/lists/${listId}`, {
            method: 'GET',
            headers: this._headers
        });
        return this._handleResponse(res);
    }
}

const api = new MainApi({
    baseUrl: 'http://localhost:3001',
});

export default api;