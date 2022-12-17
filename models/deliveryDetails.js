const mongoose = require('mongoose')

const deliveryDetailsSchema = new mongoose.Schema({

    name: String,
    mobileNo: Number,
    pincode: Number,
    locality: String,
    address: String,
    city: String,
    state: String,
    userId: String
})
// module.exports = deliveryDetailsSchema
module.exports = new mongoose.model('deliveryDetails', deliveryDetailsSchema)