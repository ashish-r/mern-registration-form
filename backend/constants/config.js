require('dotenv').config()

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY
const RECAPTCHA_VERIFICATION_URL = 'https://www.google.com/recaptcha/api/siteverify'
const MONGOOSE_ERROR_CODE = {
    duplicate: 11000
}

module.exports = {
    MONGO_CONNECTION_STRING,
    RECAPTCHA_SECRET_KEY,
    RECAPTCHA_VERIFICATION_URL,
    MONGOOSE_ERROR_CODE,
}
