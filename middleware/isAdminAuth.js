module.exports = (req,res,next)=>{
    console.log('aya kya isme');
    if(!req.session.isLoggedIn){
        res.redirect('/login');
        return ;
    }

    if(!req.session.admin){
        res.redirect('/');
        return ;
    }

    console.log(req.session.admin);

    next();
}