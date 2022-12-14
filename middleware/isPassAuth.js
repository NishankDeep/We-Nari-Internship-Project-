const loacalStorage = require('localStorage');

module.exports = (req,res,next) => {
    if(!loacalStorage.getItem('passChange')){
        res.redirect('/');
    }

    next();
}