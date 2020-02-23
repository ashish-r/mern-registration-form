import { API_BASE_URL } from "../constants/configs"

export function registerUser(postData) {
    return post('signup', { ...postData })
}

async function post(apiPath, data) {
    return fetch(
        `${API_BASE_URL}${apiPath}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
    )
    .then(response =>  response.json().then(data => ({ status: response.status, data })))
    .catch((error) => ({ success: false, message: error.message }))
}