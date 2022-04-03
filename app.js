const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user-router')
require('dotenv').config({path: './environment/default.env'})

const app = express()
const dataBaseUrl = process.env.DATABASE

mongoose.connect(dataBaseUrl,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Successfully logged in MongoDB !'))
  .catch(() => console.log('Logging in MongoDB failed !'))

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