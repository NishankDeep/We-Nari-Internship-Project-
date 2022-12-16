const mongoose = require('mongoose');

const productSchema = require('./product').productSchema;
// console.log(productSchema);
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    phoneNo: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    cartItems:{
            type : [productSchema],
            default : undefined
        }
});

module.exports = mongoose.model('User', userSchema);