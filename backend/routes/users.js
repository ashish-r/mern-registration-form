const router = require('express').Router()
const User = require('../models/user.model')
const passwordHash = require('password-hash')
const config = require('../constants/config')
const services = require('../utils/services')

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/signup').post(async (req, res) => {
    const { name, email, password, captchaValue } = req.body
    const passwordHashValue = passwordHash.generate(password)
    if (!(/^(\w+\s?)*\s*.{3,}/).test(name)) {
        return res.status(400).json({success: false, message: 'Name is invalid'})
    }
    if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
        return res.status(400).json({success: false, message: 'Email is invalid'})
    }
    if (!(/(?=.{8,})/).test(password)) {
        return res.status(400).json({success: false, message: 'Password is not strong'})
    }
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const newUser = new User({name, email, ip, passwordHash: passwordHashValue})
    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    try {
        if (captchaValue) {
            const captchaValidationResponse = await services.verifyRecaptcha(captchaValue)
            if (!captchaValidationResponse.data.success) {
                return res.status(401).json({success: false, message: 'reCaptcha validation failed'})
            }
        }
        else {
            const registrationTodayByIP = await User.countDocuments({createdAt: {$gte: startOfToday}, ip})
            if (registrationTodayByIP > 3) {
                return res.status(429).json({success: false, message: 'Too many requests'})
            }
        }
        await newUser.save()
        res.status(200).json({success: true, message: 'Registration successful!'})
    }
    catch(err) {
        if (err.code === config.MONGOOSE_ERROR_CODE.duplicate) {
            return res.status(409).json({success: false, message: 'User already esists'})
        }
        res.status(500).json({success: false, message: 'Server error'})
    }
})

module.exports = router
