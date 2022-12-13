const mongoose = require('mongoose')

const Product = require('../models/product.js')

exports.home = (req, res) => {

    Product.find((err, data) => {

        res.render('index', { data: data })
    })
}
exports.details = (req, res) => {

    Product.findOne({ _id: req.params.id }, (err, product) => {

        res.render('product_details', { product: product })
    })
}

exports.getAccount = (req,res,next) => {
    res.render('account');
}

exports.getCustomize = (req,res,next) => {
    res.render('customize');
}

exports.getAdmin = (req,res,next) => {
    res.render('admin');
}