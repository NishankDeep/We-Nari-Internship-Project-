const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')

const productSchema = require('./product').productSchema;

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
    cartItems: {

        type: [productSchema],
        default: null
    },
    wishlistItems: {

        type: [productSchema],
        default: null
    }
});
userSchema.plugin(passportLocalMongoose)

module.exports = new mongoose.model('User', userSchema);