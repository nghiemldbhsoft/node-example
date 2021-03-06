const { User } = require('../models/user.model')
const statusMessages = require('../utils/types')
const { generateJWT, verifyToken } = require('../services/token.services')

const registerService = async (username, email, password, bio) => {
  //Make sure email is unique
  const user = await User.findOne({ email: email })
  if (user) {
    throw new Error('Email already existed')
  } else {
    let token = generateJWT(email)
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
  if (user) {
    return user
  } else {
    throw new Error(statusMessages._401)
  }
}

const getUserByToken = async token => {
  let tokenPayload = verifyToken(token)
  let user = await User.findOne({ email: tokenPayload.email }).select([
    '-password',
    '-_id',
    '-__v'
  ])
  return user
}

module.exports = { registerService, loginService, getUserByToken }
