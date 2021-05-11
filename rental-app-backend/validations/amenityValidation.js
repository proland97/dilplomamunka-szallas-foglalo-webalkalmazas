const Joi = require('joi')

const createValidation = data => {

    const schema = Joi.object().keys({
        apartmentId: Joi.number().integer().required(),
        type: Joi.string().required(),
        value: Joi.number().integer().required(),
    })

    return schema.validate(data)
}

const updateValidation = data => {

    const schema = Joi.object().keys({
        id: Joi.number().integer().required(),
        type: Joi.string().optional(),
        value: Joi.number().integer().optional(),
    })

    return schema.validate(data)
}

module.exports.createValidation = createValidation
module.exports.updateValidation = updateValidation