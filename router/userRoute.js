const userController = require('../controller/userController')
const express = require('express')
const router = express()

router.post('/register', userController.addUser)

router.post('/login', userController.login)

module.exports = router