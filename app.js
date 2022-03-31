const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user-router')
const app = express()

mongoose.connect('mongodb+srv://P6Course:1234@hottakes.d5cp0.mongodb.net/HotTakes?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Successfully logged in MongoDB !'))
  .catch(() => console.log('Logging in MongoDB failed !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
  }
)

app.use(bodyParser.json())

app.use('/api/auth', userRoutes)

module.exports = app