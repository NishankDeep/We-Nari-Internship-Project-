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
module.exports = new mongoose.model('Product', productSchema)