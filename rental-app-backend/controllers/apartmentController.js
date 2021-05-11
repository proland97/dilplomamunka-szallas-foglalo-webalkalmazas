const { createValidation, updateValidation } = require('../validations/apartmentValidation')
const { paramValidation, searchParamValidation } = require('../validations/commonValidation')
const { Op } = require("sequelize");
const sequelize = require('../db/database')
const Apartment = require('../models/apartment')
const Image = require('../models/image')
const User = require('../models/user')
const Amenity = require('../models/amenity')
const Reservation = require('../models/reservation')
const Comment = require('../models/comment')

exports.createApartment = async(req, res) => {

    const { error } = createValidation(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    const t = await sequelize.transaction();
    try {
        const apartment = await req.user.createApartment({
            name: req.body.name,
            description: req.body.description,
            rooms: req.body.rooms,
            pricePerDay: parseFloat(req.body.pricePerDay).toFixed(2),
            address: req.body.address,
        }, { transaction: t })

        for (const property in req.body.amenities) {
            await apartment.createAmenity({
                type: property,
                value: req.body.amenities[property],
            }, { transaction: t })
        }

        await t.commit();
        res.status(201).json({ message: 'Apartment created', id: apartment.id })
    } catch (err) {
        await t.rollback();
        res.status(400).json({ error: err.message })
    }
}

exports.getApartments = async(req, res) => {

    try {
        let count = await Apartment.count()
        let apartments = await Apartment.findAll({
            limit: +req.query.limit || null,
            offset: +req.query.offset || null,
            include: [
                { model: Image, attributes: ['id', 'format', 'path', 'isCoverImage'] },
                { model: User, attributes: ['email'] },
                { model: Amenity, attributes: ['id', 'type', 'value'] },
                { model: Reservation, attributes: ['id'] },
                { model: Comment, attributes: ['id'] }
            ]
        })
        res.json({ apartments, count })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getApartment = async(req, res) => {

    const { error } = paramValidation(req.params)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    try {
        let apartments = await Apartment.findOne({
            where: { id: req.params.id },
            include: [
                { model: Image, attributes: ['id', 'format', 'path', 'isCoverImage'] },
                { model: User, attributes: ['email'] },
                { model: Amenity, attributes: ['id', 'type', 'value'] },
                { model: Reservation, attributes: ['id'] }
            ]
        })
        res.json(apartments)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

exports.getOwnApartments = async(req, res) => {

    try {
        let apartments = await Apartment.findAll({
            limit: +req.query.limit || null,
            offset: +req.query.offset || null,
            where: { userId: req.user.id },
            include: [
                { model: Image, attributes: ['id', 'format', 'path', 'isCoverImage'] },
                { model: User, attributes: ['email'] },
                { model: Amenity, attributes: ['id', 'type', 'value'] }
            ]
        })
        res.json(apartments);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getApartmentByName = async(req, res) => {

    const { error } = searchParamValidation(req.params)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    const name = req.params.name.toLowerCase();

    try {
        let apartments = await Apartment.findAll({
            limit: +req.query.limit || null,
            offset: +req.query.offset || null,
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: [
                { model: Image, attributes: ['id', 'format', 'path', 'isCoverImage'] },
                { model: User, attributes: ['email'] },
                { model: Amenity, attributes: ['id', 'type', 'value'] }
            ]
        })
        res.json(apartments);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

exports.deleteApartment = async(req, res) => {

    const { error } = paramValidation(req.params)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    try {
        const apartment = await Apartment.findOne({ where: { id: req.params.id } })
        if (!apartment) return res.status(400).json({ error: 'Apartment ot found, with the given id' })

        await apartment.destroy()
        res.json({ message: 'Apartment deleted' })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

exports.updateApartment = async(req, res) => {

    const t = await sequelize.transaction();
    try {
        const { error } = updateValidation(req.body)
        if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

        let apartment = await Apartment.findOne({ where: { id: req.body.id } })
        if (!apartment) return res.status(400).json({ error: 'Apartment ot found, with the given id' })

        apartment.name = req.body.name ? req.body.name : apartment.name
        apartment.description = req.body.description ? req.body.description : apartment.description
        apartment.rooms = req.body.rooms ? req.body.rooms : apartment.rooms
        apartment.pricePerDay = req.body.pricePerDay ? parseFloat(req.body.pricePerDay).toFixed(2) : apartment.pricePerDay
        apartment.address = req.body.address ? req.body.address : apartment.address

        if (req.body.amenities) {
            let amenities = await Amenity.findAll({ where: { apartmentId: apartment.id } }, { transaction: t })
            await amenities.forEach(async amenity => {
                await amenity.destroy()
            })

            for (const property in req.body.amenities) {
                await apartment.createAmenity({
                    type: property,
                    value: req.body.amenities[property],
                }, { transaction: t })
            }
        }

        await apartment.save({ transaction: t })
        await t.commit();
        res.status(200).json({ message: 'Apartment updated' })
    } catch (error) {
        await t.rollback();
        res.status(400).json({ error: error.message })
    }
}