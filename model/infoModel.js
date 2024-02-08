const mongoose = require('mongoose')

const infoSchema = new mongoose.Schema({

    state: {
        type: String,
        required: true,
        unique: true
    },

    cities: {
        type: [String],
        required: true
    }
}, {timestamps:true})

module.exports = mongoose.model('state', infoSchema)