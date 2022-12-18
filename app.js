const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const multer = require('multer')

const router = require('./routes/shop.js')
const authRouter = require('./routes/auth');
const Product = require('./models/product');

// importing models
const User = require('./models/user');

// package to define the session and maintain the cross site forgery
const MONGODB_URI="mongodb+srv://admin-prateek:test123@cluster0.a5ercz0.mongodb.net/weNari";
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const csrfProtection = csrf();

// storing session in database
const store = MongoDbStore({
    uri:MONGODB_URI,
    collection:'session'
});


const app = express()


// MULTER
// const Storage = multer.diskStorage({

//     destination: './public/images/saree_images',
//     filename: (req, file, cb) => {

//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     }
// })
const Storage = multer.diskStorage({

    destination: (req,file,cb) => {
        cb(null,'saree_images');
    },
    filename: (req, file, cb) => {

        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
})

const upload = multer({
    storage: Storage
}).single('image')



// PUBLIC
app.use(express.static(path.join(__dirname, 'public')))
app.use('/saree_images',express.static(path.join(__dirname,'saree_images')));
app.use(express.urlencoded({ extended: true }))

// pug
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))


// multer use
app.use(upload);


// setting up the session 
app.use(session({
    secret:'the authenticatino secret to establish a sessin for a particualar user',
    resave:false,
    saveUninitialized:false,
    store:store
}))

// CSURF use
app.use(csrfProtection);

app.use((req,res,next) => {
    if(!req.session.user){
        return next();
    }

    User.findOne(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        })

})

app.use((req,res,next)=>{
    // res.locals.user_name = req.user.name || 'null';
    res.locals.csrfToken = req.csrfToken();
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.admin = req.session.admin;

    next();
})

// Routes
app.use('/', router);
app.use(authRouter);




// MONGOOSE connection and port listening
mongoose.connect(MONGODB_URI)
        .then(res => {
            let port = process.env.PORT
            if (port == null || port == "") port = 80;
            
            app.listen(port, () => console.log("Server started successfully"))
        })
        .catch(err => {
            console.log("Some Error in connection");
        })