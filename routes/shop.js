const express = require('express')
const router = express.Router()

const isAuth = require('../middleware/isAuth');
const isAdminAuth = require('../middleware/isAdminAuth');

const shopController = require('../controller/shop')

router.get('/', shopController.home)

router.get('/myaccount', isAuth, shopController.getAccount);
router.get('/customize', isAuth, shopController.getCustomize);
router.get('/admin', isAdminAuth, shopController.getAdmin);
router.get('/product/:id', shopController.details);
router.get('/cart', shopController.getCart);

router.post('/admin', isAdminAuth, shopController.postAdminProd);
router.post('/cart', shopController.addToCart)

module.exports = router