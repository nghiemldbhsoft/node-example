const jwt = require('jsonwebtoken')
const { User } = require('../models/user.model')
const errorMessage = require('../utils/types')

const authMdw = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, tokenPayload) => {
      if (err) {
        return res.status(401).json({ success: false, err: err.message })
      }
      const user = await User.findOne({
        username: tokenPayload.username
      })
      if (user) {
        req.user = user
        req.token = token
        next()
      } else {
        return res.status(401).json({ err: 'Authentication required' })
      }
    })
  } else {
    return res.status(401).json({ err: 'Authentication required' })
  }
}

module.exports = authMdw
