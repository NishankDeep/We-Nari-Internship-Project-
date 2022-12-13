const User = require('../models/user');
const validator = require('email-validator');
const bcrypt = require('bcrypt');

exports.getLogin = (req,res,next) => {
    res.render('login.pug')
}

exports.getSignup = (req,res,next) => {
    res.render('signup.pug')
}

// storing data in database
exports.postSingnup = (req,res,next) => {
    const {fullName,mobileNo,email,password,confirmPassword} = req.body;

    // validating email
    if(!validator.validate(email)){
        console.log('email is not correct');
        res.redirect('/signup');
        return ;
    }

    // if(password.length <= 5){
    //     console.log('Password is to short');
    //     res.redirect('/signup')
    // }

    // validating password
    if(password !== confirmPassword){
        console.log('password are not matching');
        res.redirect('/signup');
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
                res.redirect('/signup');
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
                res.redirect('/');
            }
            else{
                console.log('login successfully');
                req.session.isLoggedIn = true;
                req.session.user = currUser;
                req.session.save(err => {
                    console.log('login successfully',err);
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



