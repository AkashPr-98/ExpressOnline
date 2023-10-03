const productController = require('../controller/productController')
const express = require('express')
const router = express()

router.post('/add', productController.addProduct)

router.get('/find', productController.findProducts)

router.post('/findproduct', productController.findProduct)

router.put('/updateproduct/:brand', productController.updateProduct)

router.delete('/delete/:brand', productController.deleteProduct)

module.exports = router