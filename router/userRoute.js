const userController = require('../controller/userController')
const express = require('express')
const router = express()
const passport = require('passport')

router.post('/register', userController.addUser)

router.get('/allUsers', userController.findUsers)

router.post('/findByCity', userController.userByCity)

router.post('/login', passport.authenticate('local'), userController.login)

router.get('/logout', userController.logout)

router.put('/update/:id', userController.updateUser)

router.get('/finduser/:id', userController.findUserById)

router.get('/find', userController.findUser)

router.delete('/dluser/:id', userController.deleteUser)

module.exports = router