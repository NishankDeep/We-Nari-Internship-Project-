const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: String,
    price: Number,
    pattern: String,
    occasion: String,
    fabric: String,
    description: String,
    image: {

        data: Buffer,
        content: String
    }
})
exports.productSchema = productSchema
exports.Product = new mongoose.model('Product', productSchema)