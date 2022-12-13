const express = require('express')
const router = express.Router()

const shop = require('../controller/shop')

router.get('/', shop.home)

router.get('/myaccount', (req, res) => {

    res.render('account')
})
router.get('/customize', (req, res) => {

    res.render('customize')
})
router.get('/admin', (req, res) => {

    res.render('admin')
})
router.get('/product/:id', shop.details)

module.exports = router