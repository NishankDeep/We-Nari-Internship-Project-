const express = require('express')
const router = express.Router()

const isAuth = require('../middleware/isAuth');
const isAdminAuth = require('../middleware/isAdminAuth');

const shopController = require('../controller/shop')

router.get('/', shopController.home)

router.get('/myaccount', isAuth, shopController.getAccount);
router.get('/customize', isAuth, shopController.getCustomize);
router.get('/admin', isAdminAuth, shopController.getAdmin);
router.get('/product', isAuth, shopController.getProduct);
router.get('/buyNow/:id', isAuth, shopController.getBuyNow);
router.get('/product/:id', shopController.details);
router.get('/cart', isAuth, shopController.getCart);
router.get('/addNewAddress', isAuth, shopController.getNewAddress);
router.get('/myAddress', isAuth, shopController.getmyAddress);
router.get('/editProfile', isAuth, shopController.getEditProfile);
router.get('/editPage/:prodId', isAdminAuth, shopController.getEditPage);
router.get('/wishlist', isAuth, shopController.getWishlist);

router.post('/admin', shopController.postAdminProd);
router.post('/cart', shopController.addToCart)
router.post('/removeFromCart', shopController.removeFromCart)
router.post('/postNewAddress', shopController.postNewAddress)
router.post('/editProfile', shopController.postEditProfile);
router.post('/deleteItem/:prodId', shopController.postDeleteProduct);
router.post('/editPage', shopController.postEditPage);
router.post('/addToWishlist', shopController.addToWishlist);
router.post('/removeFromWishlist', shopController.removeFromWishlist);

module.exports = router