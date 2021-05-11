const { createValidation, updateValidation } = require('../validations/ratingValidation')
const { paramValidation } = require('../validations/commonValidation')
const Apartment = require('../models/apartment')
const Rating = require('../models/rating')

exports.createRating = async(req, res) => {

    const { error } = createValidation(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    const apartment = await Apartment.findOne({ where: { id: req.body.apartmentId } })
    if (!apartment) return res.status(400).json({ error: 'Apartment is not found, with the given id' })

    try {
        await Rating.create({
            stars: req.body.stars,
            apartmentId: req.body.apartmentId,
            userId: req.user.id
        })

        res.json({ message: 'Rating created' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.updateRating = async(req, res) => {

    const { error } = updateValidation(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    const rating = await Rating.findOne({ where: { id: req.body.id } })
    if (!rating) return res.status(400).json({ error: 'Rating is not found, with the given id' })

    rating.stars = req.body.stars ? req.body.stars : rating.stars

    try {
        await rating.save()
        res.json({ message: 'Rating updated' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.deleteRating = async(req, res) => {

    const { error } = paramValidation(req.params)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    try {
        let rating = await Rating.findOne({ where: { id: req.params.id } })
        if (!rating) return res.status(400).json({ error: 'Rating is not found, with the given id' })

        await rating.destroy()
        res.json({ message: 'Rating deleted' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getRatingsForApartment = async(req, res) => {

    const { error } = paramValidation(req.params)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    try {
        let ratings = await Rating.findAll({
            where: {
                apartmentId: req.params.id,
            },
            attributes: ['stars']
        })
        res.json(ratings)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getRatingStat = async(req, res) => {

    const { error } = paramValidation(req.params)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    try {
        let ratings = await Rating.findAll({ where: { apartmentId: req.params.id } })

        let ratingsNum = 0
        let avg = 0

        await ratings.forEach((rating) => {
            ratingsNum++;
            avg += rating.stars
        })

        if (ratingsNum > 0) avg /= ratingsNum
        avg = parseFloat(avg).toFixed(1)

        res.json({ ratingsNum, avg })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}