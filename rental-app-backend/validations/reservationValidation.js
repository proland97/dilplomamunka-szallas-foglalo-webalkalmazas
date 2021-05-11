const Joi = require('joi');

let today = new Date()
today = new Date(today.toISOString().split('T')[0])

const reservationValidation = data => {

    const schema = Joi.object().keys({
        startDate: Joi.date().greater(today).message(`startDate must be grater than ${today}`).required(),
        endDate: Joi.date().greater(Joi.ref('startDate')).required(),
        apartmentId: Joi.number().integer().required()
    })

    return schema.validate(data)
}

module.exports.reservationValidation = reservationValidation;