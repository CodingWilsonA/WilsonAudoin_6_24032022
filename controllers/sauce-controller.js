const sauceSchema = require('../schemas/sauce')
const fs = require('fs')

//Reads sauces stored in database
const getAllSauces = (req, res) => {
    sauceSchema.find()
    .then(sauces => {res.status(200).json(sauces)})
    .catch(error => {res.status(400).json({ error })})
}

//Reads one sauce once user clicked on it
const getOneSauce = (req, res) => {
    sauceSchema.findOne({
        _id: req.params.id
    })
    .then(sauce => {res.status(200).json(sauce)})
    .catch(error => {res.status(404).json({ error })})
}

//Creates sauce in database
const createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id
    const sauce = new sauceSchema({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    sauce.save()
    .then(() => {res.status(201).json({ message: 'Sauce succesfully created !'})})
    .catch(error => {res.status(400).json({ error })})
}

//Updates sauce in database
const modifySauce = (req, res) => {
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }
    sauceSchema.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => {res.status(200).json({ message: 'Sauce successfully updated !'})})
    .catch(error => {res.status(400).json({ error })})
}

//Deletes sauce from database and image file
const deleteSauce = (req, res) => {
    sauceSchema.findOne({ _id: req.params.id })
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
            sauceSchema.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce sucessfully deleted !'}))
            .catch(error => res.status(400).json({ error }))
        })
    })
    .catch(error => res.status(404).json({ error }))
}

//Updates likes or dislikes counters
const likeDislike = (req, res) => {
    const userId = req.body.userId
    const likeOrDislike = req.body.like
    sauceSchema.findOne({ _id: req.params.id })
    .then(sauce => {
        const usersLikedArray = sauce.usersLiked
        const usersDislikedArray = sauce.usersDisliked
        switch (likeOrDislike) {
            case 1:
                addCountToObject(userId, sauce.likes, usersLikedArray)
                break
            case -1:
                addCountToObject(userId, sauce.dislikes, usersDislikedArray)
                break
            case 0:
                for (var id=0; id < usersLikedArray.length; id++) {
                    if (usersLikedArray[id].match(userId)) {
                        sauce.likes = sauce.likes -1
                        usersLikedArray.splice(id, 1)
                    }
                }
                for (var id=0; id < usersDislikedArray.length; id++) {
                    if (usersDislikedArray[id].match(userId)) {
                        sauce.dislikes = sauce.dislikes -1
                        usersDislikedArray.splice(id, 1)
                    }
                }
                break
            default:
                return res.status(400).json({ error : 'Value can only be on of the following: 0, 1, -1'})
        }
        sauce.save()
        .then(() => res.status(200).json({ message : 'Likes or dislikes successfully updated !'})) 
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(404).json({ error }))
}

//This function is used to add count sent by user action and their id to respective array
function addCountToObject(userId, saucekey, idList){
    saucekey += 1
    idList.push(userId)
}

module.exports = {getAllSauces, getOneSauce, createSauce, modifySauce, deleteSauce, likeDislike}
