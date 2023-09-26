const {addUser} = require('../controller/userController')
const express = require('express')
const router = express()

router.post('/xyz', addUser)

module.exports = router