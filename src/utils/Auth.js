import api from "./MainApi";

const baseUrl = "https://api.shopit-alfi.students.nomoredomainssbs.ru";
// const baseUrl = "http://localhost:3000";


export const signup = async (email, password, name) => {
    const res = await fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name })
    });
    return api._handleResponse(res);
}

export const signin = async (email, password) => {
    const res = await fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
    });
    return api._handleResponse(res);
}
