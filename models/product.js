const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: String,
    price: Number,
    pattern: String,
    occasion: String,
    fabric: String,
    description: String,
    imageUrl: {
        type:String,
        require:true
    }
})


exports.productSchema = productSchema
exports.Product = new mongoose.model('Product', productSchema)

// ,
//     image: {
//         data: Buffer,
//         content: String
//     }