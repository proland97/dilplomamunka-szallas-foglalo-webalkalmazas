const Comment = require('../models/comment')
const Apartment = require('../models/apartment')
const User = require('../models/user')
const Reservation = require('../models/reservation')
const { createValidation, updateValidation } = require('../validations/commentValidation')
const { paramValidation } = require('../validations/commonValidation')

exports.createComment = async(req, res) => {

    const { error } = createValidation(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    const apartment = await Apartment.findOne({ where: { id: req.body.apartmentId } })
    if (!apartment) return res.status(400).json({ error: 'Apartment is not found, with the given id' })

    const reservation = await Reservation.findOne({ where: { apartmentId: req.body.apartmentId, userId: req.user.id } })
    if (!reservation) return res.status(400).json({ error: 'Can not comment, no reservations on this Apartment' })

    try {
        await Comment.create({
            text: req.body.text,
            apartmentId: req.body.apartmentId,
            userId: req.user.id
        })

        res.json({ message: 'Comment created' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.updateComment = async(req, res) => {

    const { error } = updateValidation(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    const comment = await Comment.findOne({ where: { id: req.body.id } })
    if (!comment) return res.status(400).json({ error: 'Comment is not found, with the given id' })

    comment.text = req.body.text ? req.body.text : comment.text

    try {
        await comment.save()
        res.json({ message: 'Comment updated' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getCommentsForApartment = async(req, res) => {

    const { error } = paramValidation(req.params)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    try {
        let comments = await Comment.findAll({
            where: {
                apartmentId: req.params.id,
            },
            include: {
                model: User,
                attributes: ['username', 'email']
            }
        })
        res.json(comments)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getComment = async(req, res) => {

    const { error } = paramValidation(req.params)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    try {
        let comment = await Comment.findOne({
            where: { id: req.params.id },
            include: {
                model: User,
                attributes: ['username', 'email']
            }
        })
        res.json(comment)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.deleteComment = async(req, res) => {

    const { error } = paramValidation(req.params)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    try {
        let comment = await Comment.findOne({ where: { id: req.params.id } })
        if (!comment) return res.status(400).json({ error: 'Comment is not found, with the given id' })

        await comment.destroy()
        res.json({ message: 'Comment deleted' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}