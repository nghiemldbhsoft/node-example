const { registerService, loginService } = require('../services/auth.services')
const { generateJWT, verifyToken } = require('../services/token.services')

const register = async (req, res) => {
  const { username, password, email } = req.body.user
  try {
    let result = await registerService(username, password, email)
    res.status(200).send({user: result})
  } catch (error) {
    res.status(422).send({error : error})
  }
}

const login = async (req, res) => {
  const { username, password } = req.body
  try {
    let result = await loginService(username, password) //return username
    let token = generateJWT(result)
    res.status(200).send({username: username, token : token})
  } catch (error) {
    res.status(422).send({error : error})
  }
}

const loginByToken = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1] //ignore "Bearer"
  try {
    let result = await verifyToken(token)
    if (result) {
      res.status(200).send({success: true, username: result.username})
    } else {
      res.status(401).send({success: false, message: result})
    }
  } catch (error) {
    res.status(422).send({error : error})
  }
}

module.exports = { register, login, loginByToken }
