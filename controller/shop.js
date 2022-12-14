const mongoose = require('mongoose')

const Product = require('../models/product.js')
const User = require('../models/user.js')

exports.home = async (req, res) => {

    Product.find((err, product_data) => {

        res.render('index', { product_data: product_data, user_name: req.user.name })
    })
}
exports.details = (req, res) => {

    Product.findOne({ _id: req.params.id }, (err, product) => {

        res.render('product_details', { product: product, user_name: req.user.name })
    })
}

exports.getAccount = (req, res, next) => {
    res.render('account', { user_name: req.user.name });
}

exports.getCustomize = (req, res, next) => {
    res.render('customize', { user_name: req.user.name });
}

exports.getAdmin = (req, res, next) => {
    res.render('admin', { user_name: req.user.name });
}

exports.postAdminProd = (req, res, next) => {
    const product = new Product({

        name: req.body.name,
        price: req.body.price,
        pattern: req.body.pattern,
        occasion: req.body.occasion,
        fabric: req.body.fabric,
        description: req.body.description,
        image: {

            data: req.file.filename,
            content: 'image/png'
        }
    })
    product.save()
        .then(() => res.send("Product data saved successfully in the database"))
        .catch((err) => console.log(err))

}