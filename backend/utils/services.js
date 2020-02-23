const config = require('../constants/config')
const fetch = require('node-fetch')

function verifyRecaptcha(recaptchaValue) {
    const { RECAPTCHA_VERIFICATION_URL, RECAPTCHA_SECRET_KEY } = config
    return post(
        `${RECAPTCHA_VERIFICATION_URL}?secret=${ RECAPTCHA_SECRET_KEY }&response=${recaptchaValue}`,
    )
}

async function post(url, data) {
    return fetch(
        url,
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

module.exports = {
    verifyRecaptcha,
}
