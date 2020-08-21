const { registerService, loginService } = require('../services/auth.services')
const { verifyToken } = require('../services/token.services')

const register = async (req, res) => {
  const { username, email, password } = req.body.user
  try {
    let result = await registerService(username, email, password)
    res.status(201).send({ user: result })
  } catch (error) {
    res.status(422).send({errors: {
      body: [],
      message: error.message
    }})
  }
}

const login = async (req, res) => {
  const { username, password } = req.body.user
  try {
    let user = await loginService(username, password) //return username
    res.status(200).send({ user: user })
  } catch (error) {
    res.status(422).send(error)
  }
}

const loginByToken = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1] //ignore "Bearer"
  try {
    let result = await verifyToken(token)
    if (result) {
      res.status(200).send({ success: true, username: result.username })
    } else {
      res.status(401).send({ success: false, message: result })
    }
  } catch (error) {
    res.status(422).send({ error: error })
  }
}

module.exports = { register, login, loginByToken }
