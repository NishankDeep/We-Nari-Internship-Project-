const express = require('express')
const router = express.Router()

const isAuth = require('../middleware/isAuth');
const isAdminAuth = require('../middleware/isAdminAuth');

const shopController = require('../controller/shop')

router.get('/', shopController.home)

router.get('/myaccount',isAuth,shopController.getAccount);
router.get('/customize',isAuth,shopController.getCustomize);
router.get('/admin',isAuth,shopController.getAdmin);
router.get('/product/:id', shopController.details);

router.post('/admin',isAdminAuth,shopController.postAdminProd);

module.exports = router