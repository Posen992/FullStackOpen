const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  favoriteGenre: String
})

module.exports = mongoose.model('User', UserSchema)