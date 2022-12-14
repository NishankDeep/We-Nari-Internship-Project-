const express = require('express');

const route = express.Router();
const authController = require('../controller/auth');
const isPassAuth = require('../middleware/isPassAuth')

route.get('/login',authController.getLogin);
route.get('/signup',authController.getSignup);
route.get('/forgetPass',authController.getForgetPage);
// route.get('/changePass',authController.getChangePass);

route.post('/sign-up',authController.postSingnup);
route.post('/login',authController.postLogin);
route.post('/logout',authController.postLogout);
route.post('/forgetPass',authController.postForgetPass);
// route.post('/changePass',authController.postChangePassword);

module.exports = route;