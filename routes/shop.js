const express = require('express')
const router = express.Router()

const shop = require('../controller/shop')

router.get('/', shop.home)

router.get('/login', (req, res) => {

    res.render('login')
})
router.get('/signup', (req, res) => {

    res.render('signup')
})
router.get('/myaccount', (req, res) => {

    res.render('account')
})
router.get('/customize', (req, res) => {

    res.render('customize')
})
router.get('/product', (req, res) => {

    res.render('product')
})
router.get('/admin', (req, res) => {

    res.render('admin')
})
router.get('/product/:id', shop.details)

module.exports = router