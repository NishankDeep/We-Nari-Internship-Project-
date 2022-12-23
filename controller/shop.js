const mongoose = require('mongoose')
const validator = require('email-validator');
const removeImage = require('../util/removeImage');

const Product = require('../models/product.js').Product
const User = require('../models/user.js')
const deliveryDetails = require('../models/deliveryDetails')

exports.home = (req, res) => {

    let fname = '';

    Product.find((err, product_data) => {

        if (req.user) {

            for (let i = 0; i < req.user.name.length; i++) {

                fname += req.user.name[i]
                if (req.user.name[i] == ' ') break;
            }
        }
        res.render('index', { product_data: product_data, fname: fname })
    })
}
exports.details = (req, res) => {

    let flag = false;

    for (let i = 0; i < req.user.wishlistItems.length; i++) {

        if (req.user.wishlistItems[i]._id.equals(req.params.id)) {

            flag = true;
            break;
        }
    }
    console.log(flag)
    Product.findOne({ _id: req.params.id }, (err, product) => {

        let fname = '';
        if (req.user) {
            for (let i = 0; i < req.user.name.length; i++) {

                fname += req.user.name[i]
                if (req.user.name[i] == ' ') break;
            }
        }
        res.render('product_details', { product: product, fname: fname, flag: flag })
    })
}
exports.getAccount = (req, res, next) => {

    let fname = '';

    if (req.user) {
        for (let i = 0; i < req.user.name.length; i++) {

            fname += req.user.name[i]
            if (req.user.name[i] == ' ') break;
        }
    }
    res.render('account', { fname: fname });
}

exports.getCustomize = (req, res, next) => {

    let fname = '';

    if (req.user) {
        for (let i = 0; i < req.user.name.length; i++) {

            fname += req.user.name[i]
            if (req.user.name[i] == ' ') break;
        }
    }
    res.render('customize', { user_name: req.user.name });
}

exports.getAdmin = (req, res, next) => {

    let fname = '';

    if (req.user) {
        for (let i = 0; i < req.user.name.length; i++) {

            fname += req.user.name[i]
            if (req.user.name[i] == ' ') break;
        }
    }
    res.render('admin', { fname: fname });
}

exports.getProduct = (req, res, next) => {
    let fname = '';

    if (req.user) {
        for (let i = 0; i < req.user.name.length; i++) {

            fname += req.user.name[i]
            if (req.user.name[i] == ' ') break;
        }
    }
    Product.find()
        .then(prod => {
            // console.log(user);
            res.render('product', {
                fname: fname,
                product: prod
            });

        })
}
exports.getNewAddress = (req, res) => {

    res.render('addNewAddress')
}

exports.getEditProfile = (req, res, next) => {

    let fname = '';

    if (req.user) {

        for (let i = 0; i < req.user.name.length; i++) {

            fname += req.user.name[i]
            if (req.user.name[i] == ' ') break;
        }
    }
    res.render('editProfile', {
        user_name: req.user.name,
        name: req.user.name,
        email: req.user.email,
        phoneNo: req.user.phoneNo,
        fname: fname
    });
}

exports.getEditPage = (req, res, next) => {
    let fname = '';

    if (req.user) {
        for (let i = 0; i < req.user.name.length; i++) {

            fname += req.user.name[i]
            if (req.user.name[i] == ' ') break;
        }
    }
    const prodId = req.params.prodId;

    Product.findById(prodId)
        .then(prod => {
            res.render("editPage", {
                user_name: user_name,
                product: prod
            })
        })
        .catch(err => {
            console.log(err);
        })

}

exports.postEditPage = (req, res, next) => {
    const prodId = req.body.prodId;
    const name = req.body.name;
    const price = req.body.price;
    const pattern = req.body.pattern;
    const occasion = req.body.occasion;
    const fabric = req.body.fabric;
    const description = req.body.description;
    const image = req.file;

    Product.findById(prodId)
        .then(prod => {
            prod.name = name;
            prod.price = price;
            prod.pattern = pattern;
            prod.occasion = occasion;
            prod.fabric = fabric;
            prod.description = description;

            if (image) {
                removeImage.deleteFromFile(prod.imageUrl);
                prod.imageUrl = image.path;
            }

            return prod.save();
        })
        .then(data => {
            res.redirect('/product');
            console.log("data is updated");
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postEditProfile = (req, res, next) => {
    const { name, email, phoneNo } = req.body;

    if (name.trim() === '') {
        console.log('fullName cannot be blank');
        res.render('editProfile', {
            error: 'nameErr',
            name: name,
            email: email,
            phoneNo: phoneNo
        })
        return;
    }

    console.log(phoneNo);
    // validating Mobile Number
    if (phoneNo.trim().length !== 10) {
        console.log('mobileNo is Invalid');
        res.render('editProfile', {
            error: 'mobErr',
            name: name,
            email: email,
            phoneNo: phoneNo
        })
        return;
    }

    // validating email
    if (!validator.validate(email)) {
        console.log('email is not correct');
        // res.redirect('/signup');
        res.render('editProfile', {
            error: 'emailErr',
            name: name,
            email: email,
            phoneNo: phoneNo
        })
        return;
    }

    req.user.email = email;
    req.user.name = name;
    req.user.phoneNo = phoneNo;

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
        mobileNo: req.body.mobNumber,
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

    let fname = '';

    if (req.user) {
        for (let i = 0; i < req.user.name.length; i++) {

            fname += req.user.name[i]
            if (req.user.name[i] == ' ') break;
        }
    }
    const product = await Product.findOne({ _id: req.params.id })

    deliveryDetails.find({ userId: req.user._id }, (err, data) => {

        res.render('addressDetail', { data: data, fname: fname, product: product })
    })
}
exports.getmyAddress = (req, res) => {

    let fname = '';

    if (req.user) {
        for (let i = 0; i < req.user.name.length; i++) {

            fname += req.user.name[i]
            if (req.user.name[i] == ' ') break;
        }
    }
    deliveryDetails.find({ userId: req.user._id }, (err, data) => {

        console.log(data[0])
        res.render('myAdress', { data: data, fname: fname })
    })
}
exports.getCart = async (req, res) => {

    // const cartItems = [];
    // for (let i = 0; i < req.user.cartItems.length; i++) {

    //     const product = await Product.findOne({ _id: req.user.cartItems[i]._id })
    //     if (product) {
    //         cartItems.push(product);
    //     }
    //     // if (req.user.cartItems[i]._id.equals(product.id)) {

    //     //     req.user.cartItems.splice(i, 1)
    //     //     break
    //     // }
    // }
    // // console.log(cartItems);
    // req.user.cartItems = cartItems;

    // req.user.save()
    //     .then(() => {

    //     })
    //     .catch((err) => console.log(err))
    let fname = '';

    if (req.user) {
        for (let i = 0; i < req.user.name.length; i++) {

            fname += req.user.name[i]
            if (req.user.name[i] == ' ') break;
        }
    }
    res.render('cart', { cartItems: req.user.cartItems, fname: fname });
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

        if (req.user.cartItems[i]._id.equals(req.body.productId)) {

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
    console.log(req.file);
    let store = req.file.path;
    // store=store.substr(6);

    const product = new Product({

        name: req.body.name,
        price: req.body.price,
        pattern: req.body.pattern,
        occasion: req.body.occasion,
        fabric: req.body.fabric,
        description: req.body.description,
        imageUrl: store,
        image: {
            data: req.file.filename,
            content: 'image/png'
        }
    })
    product.save()
        .then(() => res.send("Product data saved successfully in the database"))
        .catch((err) => console.log(err))

}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.params.prodId;

    Product.findById(prodId)
        .then(prod => {
            return removeImage.deleteFromFile(prod.imageUrl);
        })
        .then(() => {
            return Product.findByIdAndRemove(prodId)
        })
        .then(() => {
            res.redirect('/product');
            console.log('deleted');
        })
        .catch(err => {
            console.log(err);
        })
}
exports.getWishlist = (req, res) => {

    let fname = '';

    if (req.user) {
        for (let i = 0; i < req.user.name.length; i++) {

            fname += req.user.name[i]
            if (req.user.name[i] == ' ') break;
        }
    }
    res.render('wishlist', { wishlistItems: req.user.wishlistItems, fname: fname });
}
exports.addToWishlist = async (req, res) => {

    console.log(req.body.wishlistToggle)

    if (req.body.wishlistToggle) {

        Product.findOne({ _id: req.body.id })
            .then(prod => {

                return prod;
            })
            .then(async (data) => {

                const user = await User.findOne({ _id: req.user._id })

                let flag = 1;

                for (let i = 0; i < user.wishlistItems.length; i++) {

                    if (user.wishlistItems[i]._id.equals(data._id)) {

                        flag = 0
                        break
                    }
                }
                if (flag === 1) {

                    user.wishlistItems.push(data)
                    user.save()
                        .then(() => console.log('Product successfully added two wislist'))
                        .catch((err) => console.log(err))
                }
                res.redirect('/product/' + req.body.id)
            })
            .catch(err => {
                console.log(err);
            })
    }
    else {

        for (let i = 0; i < req.user.wishlistItems.length; i++) {

            if (req.user.wishlistItems[i]._id.equals(req.body.id)) {

                console.log('isme aaya hai madharchod')
                req.user.wishlistItems.splice(i, 1)
                break
            }
        }
        req.user.save()
            .then(() => res.redirect('/product/' + req.body.id))
            .catch((err) => console.log(err))
    }
}
exports.removeFromWishlist = async (req, res) => {

    for (let i = 0; i < req.user.wishlistItems.length; i++) {

        if (req.user.wishlistItems[i]._id.equals(req.body.productId)) {

            req.user.wishlistItems.splice(i, 1)
            break
        }
    }
    console.log(req.user.wishlistItems)
    req.user.save()
        .then(() => res.redirect('/wishlist'))
        .catch((err) => console.log(err))
}