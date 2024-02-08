const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

mongoose.connect('mongodb://127.0.0.1:27017/ExpressDemoDB')
.then(() => {
    console.log("Successfully connected to database")
})
.catch((err) => {
    console.log(err);
})

app.use(express.json())

app.use(cors())

console.log("__filename", __filename);
console.log("__dirname", __dirname);

console.log(path.join(__dirname, 'public'));

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.send("Server is up and running")
})

const userRoute = require('./router/userRoute')
app.use('/user', userRoute)

const productRouter = require('./router/productRoute')
app.use('/product', productRouter)

const infoRouter = require('./router/infoRoute')
app.use('/info', infoRouter)

app.listen(8000, () => {
    console.log("Server is running")
})