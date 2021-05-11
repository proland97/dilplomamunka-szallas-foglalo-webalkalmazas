const Joi = require('joi');

const createValidation = data => {

    const schema = Joi.object().keys({
        stars: Joi.number().integer().min(1).max(5).required(),
        apartmentId: Joi.number().integer().required(),
    })

    return schema.validate(data)
}

const updateValidation = data => {

    const schema = Joi.object().keys({
        id: Joi.number().required(),
        stars: Joi.number().integer().min(1).max(5).required(),
    })

    return schema.validate(data)
}

module.exports.createValidation = createValidation;
module.exports.updateValidation = updateValidation;