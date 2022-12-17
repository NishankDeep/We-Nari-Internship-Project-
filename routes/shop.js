const express = require('express')
const router = express.Router()

const isAuth = require('../middleware/isAuth');
const isAdminAuth = require('../middleware/isAdminAuth');

const shopController = require('../controller/shop')

router.get('/', shopController.home)

router.get('/myaccount', isAuth, shopController.getAccount);
router.get('/customize', isAuth, shopController.getCustomize);
router.get('/admin', isAdminAuth, shopController.getAdmin);
router.get('/product', shopController.getProduct);
router.get('/buyNow/:id', isAuth, shopController.getBuyNow);
router.get('/product/:id', shopController.details);
router.get('/cart', isAuth, shopController.getCart);
router.get('/addNewAddress', isAuth, shopController.getNewAddress);
router.get('/myAddress', isAuth, shopController.getmyAddress);

router.post('/admin', isAdminAuth, shopController.postAdminProd);
router.post('/cart', isAuth, shopController.addToCart)
router.post('/removeFromCart', isAuth, shopController.removeFromCart)
router.post('/postNewAddress', isAuth, shopController.postNewAddress)

module.exports = router