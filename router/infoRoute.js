const infoController = require('../controller/infoController')
const express = require('express')
const router = express()

router.post('/add', infoController.addInfo)

module.exports = router