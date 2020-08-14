const jwt = require('jsonwebtoken')

const generateJWT = username => {
  let token = jwt.sign(
    {
      username: username
    },
    process.env.SECRET_KEY,
  )
  return token
}

module.exports = { generateJWT }
