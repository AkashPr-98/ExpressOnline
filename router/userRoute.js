const userController = require('../controller/userController')
const express = require('express')
const router = express()

router.post('/register', userController.addUser)

router.get('/allUsers', userController.findUsers)

router.post('/findByCity', userController.userByCity)

router.post('/login', userController.login)

router.put('/update/:id', userController.updateUser)

router.get('/finduser/:id', userController.findUserById)

router.delete('/dluser/:id', userController.deleteUser)

module.exports = router