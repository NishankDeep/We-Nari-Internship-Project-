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

exports.postAdminProd = (req,res,next) => {
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