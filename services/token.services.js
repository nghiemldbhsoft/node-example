const jwt = require('jsonwebtoken')

const generateJWT = email => {
  let token = jwt.sign(
    {
      email: email
    },
    process.env.SECRET_KEY
  )
  return token
}

const verifyToken = token => {
  let result = jwt.verify(
    token,
    process.env.SECRET_KEY,
    (error, tokenPayload) => {
      if (error) {
        console.log(error)
        return error.message
      } else {
        console.log(tokenPayload)
        return tokenPayload
      }
    }
  )
  return result
}

module.exports = { generateJWT, verifyToken }
