const User = require('../models/user');
const validator = require('email-validator');
const bcrypt = require('bcrypt');


exports.getLogin = (req,res,next) => {
    res.render('auth/login.pug')
}

exports.getSignup = (req,res,next) => {
    res.render('auth/signup.pug')
}

exports.getForgetPage = (req,res,next) => {
    res.render('auth/forgetPassword')
}



// storing data in database
exports.postSingnup = (req,res,next) => {
    const {fullName,mobileNo,email,password,confirmPassword} = req.body;

    const userInfo = {
        fullName:fullName,
        mobileNo:mobileNo,
        email:email,
        password:password,
        confirmPassword:confirmPassword
    };

    // validating fullName
    if(fullName.trim() === ''){
        console.log('fullName cannot be blank');
        res.render('auth/signup',{
            formData:userInfo,
            error : 'nameErr'
        })
        return ;
    }

    // validating Mobile Number
    if(mobileNo.trim().length !== 10){
        console.log('mobileNo is Invalid');
        res.render('auth/signup',{
            formData:userInfo,
            error : 'mobErr'
        })
        return ;
    }

    // validating email
    if(!validator.validate(email)){
        console.log('email is not correct');
        // res.redirect('/signup');
        res.render('auth/signup',{
            formData:userInfo,
            error : 'emailErr'
        })
        return ;
    }

    if(password.length <= 5){
        console.log('Password is to short');
        res.render('auth/signup',{
            formData:userInfo,
            error : 'passErr'
        })
        return ;
    }

    // validating password
    if(password !== confirmPassword){
        console.log('password are not matching');
        // res.redirect('/signup');
        res.render('auth/signup',{
            formData:userInfo,
            error : 'notMatchPass'
        })
        return ;
    }

    User.findOne({email:email})
        .then(user => {
            if(user){
                return null;
            }
            else{
                return bcrypt.hash(password,15);
            }
            
        })
        .then(hashPassword => {
            if(!hashPassword){
                // console.log('userExist');
                return null;
            }
            else{
                const user = new User({
                    name:fullName,
                    phoneNo:mobileNo,
                    email:email,
                    password:hashPassword
                })

                return user.save();
            }
        })
        .then(result => {
            if(!result){
                console.log('user already exist');
                res.render('auth/signup',{
                    formData:userInfo,
                    error : 'emailExist'
                })
                return ;
            }
            else{
                res.status(200).redirect('/login');
            }
        })
        .catch(err => {
            console.log(err);
        })

}

exports.postLogin = (req,res,next) => {
    const {email,password} = req.body;
    let currUser;

    User.findOne({email:email})
        .then(user => {
            if(!user){
                return null;
            }
            else{
                currUser=user;
                return bcrypt.compare(password,user.password);
            }
        })
        .then(compareResult => {
            if(!compareResult){
                console.log('login failed');
                // res.redirect('/');
                res.render('auth/login',{
                    email:email,
                    password:password,
                    error:'invalidData'
                })
            }
            else{
                console.log('login successfully');
                req.session.isLoggedIn = true;
                req.session.user = currUser;
                if(email === 'admin@1.com'){
                    console.log('ghusa kya');
                    req.session.admin = true;
                }

                req.session.save(err => {
                    console.log(err);
                    res.redirect('/');
                });
            }
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postLogout = (req,res,next) => {
    req.session.destroy(err => {
        console.log(req.session);
        res.redirect('/');
    })
}

exports.postForgetPass = (req,res,next) => {
    const {email,password,confirmPassword} = req.body;

    if(!validator.validate(email)){
        console.log('invalid email id');
        res.render('auth/forgetPassword',{
            email:email,
            password:password,
            confirmPassword:confirmPassword,
            error:'emailInvalid',
            message:"Email is not correct"
        })
        return ;
    }

    if(password.trim().length < 5 ){
        res.render('auth/forgetPassword',{
            error:'invalid',
            message: 'Password length must be (> 5)',
            email:email,
            password:password,
            confirmPassword:confirmPassword
        })
        return ;
    }

    if(password !== confirmPassword){
        res.render('auth/forgetPassword',{
            error:'invalid',
            message: 'Password and Confirm Password do not match',
            email:email,
            password:password,
            confirmPassword:confirmPassword
        })
        return ;
    }


    let currUser;

    User.findOne({email:email})
        .then(user => {
            if(!user){
                
            }
            else{
                currUser = user;
                return bcrypt.hash(password,15);
            }
        })
        .then(encrptPass => {
            if(!encrptPass){
                return null;
            }
            else{
                currUser.password = encrptPass;
                return currUser.save();
            }
        })
        .then(data => {
            if(!data){
                res.render('auth/forgetPassword',{
                    email:email,
                    password:'',
                    confirmPassword:'',
                    error:'emailInvalid',
                    message:'E-mail id is not registered'
                })
            }
            else{
                console.log('password Changed successfully');
                res.redirect('/login');
            }
        })
        .catch(err => {
            console.log(err);
        })
}

