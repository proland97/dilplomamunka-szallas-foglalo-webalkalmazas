const { paramValidation } = require('../validations/commonValidation')
const { reservationValidation } = require('../validations/reservationValidation')
const Apartment = require('../models/apartment')
const Reservation = require('../models/reservation')
const User = require('../models/user')

exports.createReservation = async(req, res) => {

    const { error } = reservationValidation(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    const apartment = await Apartment.findOne({ where: { id: req.body.apartmentId } })
    if (!apartment) return res.status(400).json({ error: 'Apartment is not found, with the given id' })

    try {
        await apartment.createReservation({
            startDate: new Date(req.body.startDate),
            endDate: new Date(req.body.endDate),
            userId: req.user.id
        })
        res.json({ message: 'Reservation created' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.deleteReservation = async(req, res) => {

    const { error } = paramValidation(req.params)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    try {
        let reservation = await Reservation.findOne({ where: { id: req.params.id } })
        if (!reservation) return res.status(400).json({ error: 'Reservation is not found, with the given id' })

        let today = new Date()
        today = new Date(today.toISOString().split('T')[0])
        let startDate = new Date(reservation.startDate)
        if (startDate <= today) return res.status(400).json({ error: 'Can not delete reservation that start before tomorrow!' })

        reservation.destroy()
        res.json({ message: 'Reservation deleted' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getOwnReservations = async(req, res) => {

    try {
        let reservations = await Reservation.findAll({
            where: { userId: req.user.id },
            include: [
                { model: Apartment, attributes: ['name'] },
            ],
        })
        res.json(reservations)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getReservationsByApartment = async(req, res) => {

    const { error } = paramValidation(req.params)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    try {
        let reservations = await Reservation.findAll({
            where: { apartmentId: req.params.id },
            include: [
                { model: User, attributes: ['email', 'username'] },
            ],
        })
        res.json(reservations)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getReservation = async(req, res) => {

    const { error } = paramValidation(req.params)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    try {
        let reservations = await Reservation.findOne({
            where: { id: req.params.id },
            include: [
                { model: User, attributes: ['email', 'username'] },
                { model: Apartment, attributes: ['name'] },
            ],
        })
        res.json(reservations)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getReservationForMyApartment = async(req, res) => {

    try {
        let reservations = await Reservation.findAll({
            where: { '$apartment.userId$': req.user.id },
            include: [
                { model: Apartment, attributes: ['name', 'userId'], required: true },
                { model: User, attributes: ['email'], required: true },
            ],
            order: [
                ['apartmentId', 'ASC']
            ]
        })

        res.json(reservations)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}