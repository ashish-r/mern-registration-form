const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 6,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
})

const User = mongoose.model('User', userSchema)

module.exports = User
