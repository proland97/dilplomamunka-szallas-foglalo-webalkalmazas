const { createValidation, updateValidation } = require('../validations/amenityValidation')
const { paramValidation } = require('../validations/commonValidation')

const Amenity = require('../models/amenity')
const Apartment = require('../models/apartment')

exports.create = async(req, res, next) => {

    const { error } = createValidation(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    const apartment = await Apartment.findOne({ where: { id: req.body.apartmentId } })
    if (!apartment) return res.status(400).json({ error: 'Apartment is not found, with the given id' })

    try {
        await Amenity.create({
            type: req.body.type,
            value: req.body.value,
            apartmentId: req.body.apartmentId,
        })

        res.json({ message: 'Amenity created' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.update = async(req, res, next) => {

    const { error } = updateValidation(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    const amenity = await Amenity.findOne({ where: { id: req.body.id } })
    if (!amenity) return res.status(400).json({ error: 'Amenity is not found, with the given id' })

    amenity.type = req.body.type ? req.body.type : amenity.type
    amenity.value = req.body.value ? req.body.value : amenity.value

    try {
        await amenity.save()
        res.json({ message: 'Amenity updated' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.delete = async(req, res, next) => {

    const { error } = paramValidation(req.params)
    if (error) return res.status(400).send({ error: error.details[0].message.replace(/\"/g, '') })

    try {
        let amenity = await Amenity.findOne({ where: { id: req.params.id } })
        if (!amenity) return res.status(400).json({ error: 'Amenity is not found, with the given id' })

        amenity.destroy()
        res.json({ message: 'Amenity deleted' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}