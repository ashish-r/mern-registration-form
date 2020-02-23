require('dotenv').config()

const MONGOATLAS_URI = process.env.MONGOATLAS_URI
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY
const RECAPTCHA_VERIFICATION_URL = 'https://www.google.com/recaptcha/api/siteverify'
const MONGOOSE_ERROR_CODE = {
    duplicate: 11000
}

module.exports = {
    MONGOATLAS_URI,
    RECAPTCHA_SECRET_KEY,
    RECAPTCHA_VERIFICATION_URL,
    MONGOOSE_ERROR_CODE,
}
