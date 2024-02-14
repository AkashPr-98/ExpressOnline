const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

mongoose.connect('mongodb://127.0.0.1:27017/ExpressDemoDB')
    .then(() => {
        console.log("Successfully connected to database")
    })
    .catch((err) => {
        console.log(err);
    })

app.use(express.json())

app.use(session({
    secret: 'abcd',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: false,
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors(
    {
      origin: 'http://localhost:3000',
      credentials: true,
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
  ));

app.get('/', (req, res) => {
    res.send("Server is up and running")
})

const userRoute = require('./router/userRoute')
app.use('/user', userRoute)

const productRouter = require('./router/productRoute')
app.use('/product', productRouter)

app.listen(8000, () => {
    console.log("Server is running")
})