const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const multer = require('multer')

const router = require('./routes/shop.js')
const Product = require('./models/product')

// authenticaion logic
const MONGODB_URI='mongodb url';
const session = require('express-session');
const MONGODbStore = require()


const app = express()

// PUBLIC
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

// pug
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// MONGOOSE
mongoose.connect("mongodb://localhost:27017/weNari")

// MULTER
const Storage = multer.diskStorage({

    destination: './public/images/saree_images',
    filename: (req, file, cb) => {

        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({

    storage: Storage
}).single('image')

// Routes
app.use('/', router)

app.post('/admin', (req, res) => {

    upload(req, res, (err) => {

        if (err) console.log(err)

        else {

            const product = new Product({

                name: req.body.name,
                price: req.body.price,
                pattern: req.body.pattern,
                occasion: req.body.occasion,
                fabric: req.body.fabric,
                description: req.body.description,
                image: {

                    data: req.file.filename,
                    content: 'image/png'
                }
            })
            product.save()
                .then(() => res.send("Product data saved successfully in the database"))
                .catch((err) => console.log(err))
        }
    })
})

app.listen(80, () => console.log("Server started successfully at port 80!"))