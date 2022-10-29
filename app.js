const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const router = require('./routes/shop.js')

const app = express()

// PUBLIC
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

// pug
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Routes
app.use('/', router)

app.listen(80, () => console.log("Server started successfully at port 80!"))