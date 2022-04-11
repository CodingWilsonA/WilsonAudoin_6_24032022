const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = require('../schemas/user')
const dotenv = require('dotenv')

dotenv.config({path: './environment/default.env'})
const tokenSalt = process.env.TOKENSALT

const signup = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const user = new userSchema({ 
            email: req.body.email,
            password: hash
        })
        await user.save()
        return res.status(201).json({ message : 'User successfully created !'})
    } catch (error) {
    res.status(400).json({ error })
    }
}

const login = (req, res) => {
    userSchema.findOne({ email : req.body.email })
    .then(user => {
      if (!user) {
          return res.status(401).json({error: 'User not found'})
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({error: 'Invalid password'})
            }
            res.status(200).json({
                userId : user._id,
                token: jwt.sign(
                    { userId : user._id },
                    tokenSalt,
                    { expiresIn : '24h' }
                )
            })
        })
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}))
}

module.exports = {login, signup}