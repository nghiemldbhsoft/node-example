const { registerService, loginService, getUserByToken } = require('../services/auth.services')

const register = async (req, res) => {
  const { username, email, password, bio } = req.body
  try {
    let result = await registerService(username, email, password, bio)
    res.status(201).send({ user: result })
  } catch (error) {
    res.status(422).send({errors: {
      body: [],
      message: error.message
    }})
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await loginService(email, password) //return username
    res.status(200).send({ user: user })
  } catch (error) {
    res.status(422).send({errors: {
      body: [],
      message: error.message
    }})
  }
}

const loginByToken = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1] //ignore "Bearer"
  try {
    let user = await getUserByToken(token)
    if (user) {
      res.status(200).send({ user: user })
    } else {
      res.status(404).send({errors: {
        body: [],
        message: "Not found"
      }})
    }
  } catch (error) {
    res.status(422).send({errors: {
      body: [],
      message: error.message
    }})
  }
}

module.exports = { register, login, loginByToken }
