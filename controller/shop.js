const mongoose = require('mongoose')

const Product = require('../models/product.js')
const User = require('../models/user.js')

exports.home = (req, res) => {

    Product.find((err, product_data) => {

        let user_name = '';
        if (req.user) user_name = req.user.name;

        res.render('index', { product_data: product_data, user_name: user_name })
    })
}
exports.details = (req, res) => {

    Product.findOne({ _id: req.params.id }, (err, product) => {

        let user_name = '';
        if (req.user) user_name = req.user.name;

        res.render('product_details', { product: product, user_name: user_name })
    })
}

exports.getAccount = (req, res, next) => {

    let user_name = '';
    if (req.user) user_name = req.user.name;

    res.render('account', { user_name: user_name });
}

exports.getCustomize = (req, res, next) => {

    let user_name = '';
    if (req.user) user_name = req.user.name;

    res.render('customize', { user_name: req.user.name });
}

exports.getAdmin = (req, res, next) => {

    let user_name = '';
    if (req.user) user_name = req.user.name;

    res.render('admin', { user_name: user_name });
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