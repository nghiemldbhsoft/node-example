const router = require('express').Router()

const { login, register, loginByToken } = require('../controllers/auth.controller')

router.post('/', register)
router.post('/login', login)
router.get('/', loginByToken)

module.exports = router
