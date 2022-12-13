const express = require('express');

const route = express.Router();
const authController = require('../controller/auth');

route.get('/login',authController.getLogin);

route.get('/signup',authController.getSignup);


module.exports = route;