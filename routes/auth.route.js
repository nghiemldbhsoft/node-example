const router = require('express').Router
const {login, register} = require('../controllers/auth.controller')

router.post('/', register)