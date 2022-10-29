const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {

    res.render('index')
})
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
module.exports = router