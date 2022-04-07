const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//TODO ajouter un index pour optimiser la recherche dans la base de données

const userSchema = mongoose.Schema({
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)