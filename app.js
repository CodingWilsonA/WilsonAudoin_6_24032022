const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb+srv://P6Course:1234@hottakes.d5cp0.mongodb.net/HotTakes?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
  })

app.use((req, res, next) => {
  console.log('Request received !')
  next()
})

app.use((req, res, next) => {
  res.status(201)
  next()
})

app.use((req, res, next) => {
  res.json({ message: 'Your request has been successfully received !' })
  next()
})

app.use((req, res, next) => {
  console.log('Response successfully sent !')
})

module.exports = app