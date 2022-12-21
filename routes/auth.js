const express = require('express');

const route = express.Router();
const authController = require('../controller/auth');
const isLoginAuth = require('../middleware/isLoginAuth')

route.get('/login',isLoginAuth,authController.getLogin);
route.get('/signup',isLoginAuth,authController.getSignup);
route.get('/forgetPass',isLoginAuth,authController.getForgetPage);
route.get('/changePass',authController.getChangePass);

route.post('/sign-up',authController.postSingnup);
route.post('/login',authController.postLogin);
route.post('/logout',authController.postLogout);
route.post('/forgetPass',authController.postForgetPass);
route.post('/changePass',authController.postChangePassword);

module.exports = route;