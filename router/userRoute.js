const userController = require('../controller/userController')
const express = require('express')
const router = express()

router.post('/register', userController.addUser)

router.get('/allUsers', userController.findUsers)

router.post('/findByCity', userController.userByCity)

router.post('/login', userController.login)

router.put('/update/:first_name', userController.updateUser)

router.delete('/dluser/:first_name', userController.deleteUser)

module.exports = router