const { User } = require('../models/user.model')
const statusMessages = require('../utils/types')
const { generateJWT } = require('../services/token.services')

const registerService = async (username, email, password) => {
  const user = await User.findOne({ username: username })
  console.log('user in db yet?', user)
  if (user) {
    throw new Error(statusMessages._422)
  } else {
    let token = generateJWT(username)
    console.log(token)
    const newUser = new User({
      email: email,
      token: token,
      username: username,
      password: password,
      bio: '',
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

const loginService = async (username, password) => {
  const user = await User.findOne({
    username: username,
    password: password
  }).select(['-password', '-_id', '-__v'])
  if (user) {
    return user
  } else {
    throw new Error(statusMessages._401)
  }
}

module.exports = { registerService, loginService }
