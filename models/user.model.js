const mongoose = require('mongoose')

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const userSchema = mongoose.Schema({
  email: {
    type: String,
    validate: [validateEmail, 'Invalid email! :(']
  },
  token: String,
  username: {
    type: String,
    minlength: 6,
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  image : String,
  bio : {
    type: String,
    maxlength: 150,
  }
})

const User = mongoose.model('User', userSchema)

module.exports = { userSchema, User }
