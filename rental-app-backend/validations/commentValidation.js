const Joi = require('joi');

const createValidation = data => {

    const schema = Joi.object().keys({
        text: Joi.string().min(2).required(),
        apartmentId: Joi.number().integer().required(),
    })

    return schema.validate(data)
}

const updateValidation = data => {

    const schema = Joi.object().keys({
        id: Joi.number().required(),
        text: Joi.string().min(2).optional(),
    })

    return schema.validate(data)
}

module.exports.createValidation = createValidation;
module.exports.updateValidation = updateValidation;