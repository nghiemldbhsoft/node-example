const router = require('express').Router

router.use('/users', require('./auth.route'))

module.exports = { router }
