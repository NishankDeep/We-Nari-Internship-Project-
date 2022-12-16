const mongoose = require('mongoose')

const Product = require('../models/product.js').Product
const User = require('../models/user.js')
const productSchema = require('../models//product').productSchema;


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

    let user_name = '';
    if (req.user) user_name = req.user.name;

    res.render('addressDetail', { user_name: user_name })
}
exports.getCart = (req, res) => {

    let user_name = '';
    if (req.user) user_name = req.user.name;

    res.render('cart', { cartItems: req.user.cartItems, user_name: user_name });
}

exports.addToCart = (req, res) => {

    Product.findOne({ _id: req.body.id })
        .then(prod => {

            return prod;
        })
        .then(async (data) => {

            const user = await User.findOne({ _id: req.user._id })

            let flag = 1;

            for (let i = 0; i < user.cartItems.length; i++) {

                if (user.cartItems[i]._id.equals(data._id)) {

                    flag = 0
                    break
                }
            }
            if (flag === 1) {

                user.cartItems.push(data)
                user.save()
                    .then(() => console.log('Product successfully added two cart'))
                    .catch((err) => console.log(err))
            }
            res.redirect('/cart')
        })
        .catch(err => {
            console.log(err);
        })

}
exports.removeFromCart = async (req, res) => {

    for (let i = 0; i < req.user.cartItems.length; i++) {

        const product = await Product.findOne({ _id: req.body.productId })

        if (req.user.cartItems[i]._id.equals(product.id)) {

            req.user.cartItems.splice(i, 1)
            break
        }
    }
    console.log(req.user.cartItems)
    req.user.save()
        .then(() => res.redirect('/cart'))
        .catch((err) => console.log(err))
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

