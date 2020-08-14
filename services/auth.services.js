const { User } = require('../models/user.model')
const statusMessages = require('../utils/types')

const registerService = async (username, password) => {
  const user = await User.findOne({ username: username })
  if (user) {
    throw new Error(statusMessages._422)
  } else {
    const newUser = new User({ username: username, password: password })
    return newUser.save()
  }
}

const loginService = async (username, password) => {
  const user = await User.findOne({ username: username, password: password })
  if (user) {
    return user.username
  } else {
    throw new Error(statusMessages._422)
  }
}

module.exports = { registerService, loginService }
