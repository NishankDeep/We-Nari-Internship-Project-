const mongoose = require('mongoose');

const productSchema = require('./product').productSchema;
<<<<<<< HEAD

console.log(productSchema.obj)
=======
// console.log(productSchema);
>>>>>>> 91c8d6ad33ec6684721f6ecbd6385a206f98dac7
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