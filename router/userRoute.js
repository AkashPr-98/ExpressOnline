const userController = require('../controller/userController')
const express = require('express')
const router = express()

router.post('/xyz', userController.addUser)

router.get('/def', userController.findUsers)

module.exports = router