const express = require('express');

const route = express.Router();
const authController = require('../controller/auth');

route.get('/login',authController.getLogin);
route.get('/signup',authController.getSignup);

route.post('/sign-up',authController.postSingnup);
route.post('/login',authController.postLogin);
route.post('/logout',authController.postLogout);

module.exports = route;