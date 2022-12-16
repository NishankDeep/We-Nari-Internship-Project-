const mongoose = require('mongoose')

const Product = require('../models/product.js').Product
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

exports.getProduct = (req, res, next) => {
    let user_name = '';
    if (req.user) user_name = req.user.name;
    console.log(user_name);

    Product.find()
        .then(prod => {
            // console.log(user);
            res.render('product', {
                user_name: user_name,
                product: prod
            });

        })
}

exports.getBuyNow = (req, res, next) => {
    res.render('addressDetail')
}
exports.getCart = (req, res) => {

    // req.user.cartItems.forEach((productId) => {

    //     Product.findOne({ _id: productId }, (err, product) => {

    //         res.render('cart', { product: product })
    //     })
    // })
    res.render('cart', { cartItems: req.user.cartItems })
}
exports.addToCart = (req, res) => {

    console.log(req.user.cartItems)

    User.updateOne({ _id: req.user._id }, { $push: { cartItems: req.body.product } }, (err, data) => {

        if (!err) res.redirect('/cart')

        else console.log(err)
    })
}
exports.postAdminProd = (req, res, next) => {
    // console.log(req.file);
    // let store = req.file.path;
    // store=store.substr(6);

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

