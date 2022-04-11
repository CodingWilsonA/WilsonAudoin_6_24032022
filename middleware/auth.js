const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({path: './environment/default.env'})
const tokenSalt = process.env.TOKENSALT

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, tokenSalt)
        const userId = decodedToken.userId
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Unvalid user ID !'
        } else {
            next()
        }
    } catch (error) {
        res.status(401).json({ message: 'Unauthenticated request !'})
    }
}