const { User } = require('../models/user.model')
const statusMessages = require('../utils/types')
const { generateJWT } = require('../services/token.services')

const registerService = async (username, email, password, bio) => {
  const user = await User.findOne({ email: email })
  console.log('email in db yet?', user)
  if (user) {
    throw new Error('Email already existed')
  } else {
    let token = generateJWT(email)
    console.log(token)
    const newUser = new User({
      email: email,
      token: token,
      username: username,
      password: password,
      bio: bio,
      image: ''
    })
    let response = await newUser.save()
    console.log('saved user', response)
    let result = {
      email: response.email,
      token: response.token,
      username: response.username,
      bio: response.bio,
      image: response.image
    }
    return result
  }
}

const loginService = async (email, password) => {
  const user = await User.findOne({
    email: email,
    password: password
  }).select(['-password', '-_id', '-__v'])
  console.log(user)
  if (user) {
    return user
  } else {
    throw new Error(statusMessages._401)
  }
}

module.exports = { registerService, loginService }
