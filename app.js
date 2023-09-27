const mongoose = require('mongoose')
const express = require('express')
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/ExpressDemoDB')
.then(() => {
    console.log("Successfully connected to database")
})
.catch((err) => {
    console.log(err);
})

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Server is up and running")
})

const userRoute = require('./router/userRoute')
app.use('/abc', userRoute)

app.listen(8000, () => {
    console.log("Server is running")
})