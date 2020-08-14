const { registerService, loginService } = require('../services/auth.services')
const { generateJWT } = require('../services/token.services')

const register = async (req, res) => {
  const { username, password } = req.body
  try {
    let result = await registerService(username, password)
    res.status(200).send(result)
  } catch (error) {
    res.status(422).send(error)
  }
}

const login = async (req, res) => {
  const { username, password } = req.body
  console.log(req.body)
  try {
    let result = await loginService(username, password) //return username
    let token = generateJWT(result)
    res.status(200).send(token)
  } catch (error) {
    res.status(422).send(error)
  }
}

module.exports = { register, login }
