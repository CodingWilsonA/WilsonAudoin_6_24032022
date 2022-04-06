const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const {getAllSauces, getOneSauce, createSauce, modifySauce, deleteSauce, likeDislike} = require('../controllers/sauce-controller')

router.get('/', auth, getAllSauces)
router.get('/:id', auth, getOneSauce)
router.post('/', auth, multer, createSauce)
router.post('/:id/like', auth, likeDislike)
router.put('/:id', auth, multer, modifySauce)
router.delete('/:id', auth, deleteSauce)

module.exports = router