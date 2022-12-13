

exports.getLogin = (req,res,next) => {
    res.render('login.pug')
}

exports.getSignup = (req,res,next) => {
    res.render('signup.pug')
}