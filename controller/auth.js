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
        res.render('signup',{
            formData:userInfo,
            error : 'nameErr'
        })
        return ;
    }

    // validating Mobile Number
    if(mobileNo.trim().length !== 10){
        console.log('mobileNo is Invalid');
        res.render('signup',{
            formData:userInfo,
            error : 'mobErr'
        })
        return ;
    }

    // validating email
    if(!validator.validate(email)){
        console.log('email is not correct');
        // res.redirect('/signup');
        res.render('signup',{
            formData:userInfo,
            error : 'emailErr'
        })
        return ;
    }

    if(password.length <= 5){
        console.log('Password is to short');
        res.render('signup',{
            formData:userInfo,
            error : 'passErr'
        })
        return ;
    }

    // validating password
    if(password !== confirmPassword){
        console.log('password are not matching');
        // res.redirect('/signup');
        res.render('signup',{
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
                res.render('signup',{
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



