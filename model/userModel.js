const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: true
    },

    last_name: String,

    age: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true,
        default: "Nashik"
    }
})

module.exports = mongoose.model("Registration", userSchema)