const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    product_name: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    quantity_sold: {
        type: Number,
        required: true
    }
}, {timestamps:true})

module.exports = mongoose.model('product', productSchema)