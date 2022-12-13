const mongoose = require('mongoose')

const Product = require('../models/product.js')

exports.home = (req, res) => {

    Product.find((err, data) => {

        console.log(data)
        res.render('index', { data: data })
    })
}
exports.details = (req, res) => {

    Product.findOne({ _id: req.params.id }, (err, product) => {

        res.render('product_details', { product: product })
    })
}