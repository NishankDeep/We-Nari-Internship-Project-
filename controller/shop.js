const mongoose = require('mongoose')
const validator = require('email-validator');

const Product = require('../models/product.js').Product
const User = require('../models/user.js')
const deliveryDetails = require('../models/deliveryDetails')

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
exports.getNewAddress = (req, res) => {

    res.render('addNewAddress')
}

exports.getEditProfile = (req,res,next) => {
    res.render('editProfile',{
        name:req.user.name,
        email:req.user.email,
        phoneNo:req.user.phoneNo
    });
}

exports.postEditProfile = (req,res,next) => {
    const {name,email,phoneNo} = req.body;

    if (name.trim() === '') {
        console.log('fullName cannot be blank');
        res.render('editProfile', {
            error: 'nameErr',
            name:name,
            email:email,
            phoneNo:phoneNo
        })
        return;
    }

    console.log(phoneNo);
    // validating Mobile Number
    if (phoneNo.trim().length !== 10) {
        console.log('mobileNo is Invalid');
        res.render('editProfile', {
            error: 'mobErr',
            name:name,
            email:email,
            phoneNo:phoneNo
        })
        return;
    }

    // validating email
    if (!validator.validate(email)) {
        console.log('email is not correct');
        // res.redirect('/signup');
        res.render('editProfile', {
            error: 'emailErr',
            name:name,
            email:email,
            phoneNo:phoneNo
        })
        return;
    }

    req.user.email=email;
    req.user.name=name;
    req.user.phoneNo=phoneNo;
    
    req.user.save()
        .then(data => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })

}


exports.postNewAddress = (req, res) => {

    const deliverydetails = new deliveryDetails({

        name: req.body.name,
        mobileNo: req.body.mobile,
        pincode: req.body.pincode,
        locality: req.body.locality,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        userId: req.user._id
    });
    deliverydetails.save()
        .then(res.redirect('/myAddress'))
        .catch((err) => console.log(err))
}
exports.getBuyNow = async (req, res, next) => {

    let user_name = '';
    if (req.user) user_name = req.user.name;

    const product = await Product.findOne({ _id: req.params.id })

    deliveryDetails.find({ userId: req.user._id }, (err, data) => {

        res.render('addressDetail', { data: data, user_name: user_name, product: product })
    })
}
exports.getmyAddress = (req, res) => {

    let user_name = '';
    if (req.user) user_name = req.user.name;

    deliveryDetails.find({ userId: req.user._id }, (err, data) => {

        res.render('myAdress', { data: data, user_name: user_name })
    })
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

exports.postDeleteProduct = (req,res,next) => {
    const prodId = req.params.prodId

    Product.findByIdAndRemove(prodId)
            .then(() => {
                res.redirect('/product');
                console.log('deleted');
            })
            .catch(err => {
                console.log(err);
            })
}

