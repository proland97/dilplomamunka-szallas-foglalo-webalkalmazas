const Joi = require('joi')

const createValidation = data => {

    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
        description: Joi.string().required(),
        rooms: Joi.number().integer().min(0).required(),
        pricePerDay: Joi.number().required(),
        address: Joi.string().required(),
        amenities: Joi.any().custom(amenitiesCheck, 'amenity check')
    })

    return schema.validate(data)
}

const updateValidation = data => {

    const schema = Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().min(3).optional(),
        description: Joi.string().optional(),
        rooms: Joi.number().integer().min(0).optional(),
        pricePerDay: Joi.number().optional(),
        address: Joi.string().optional(),
        amenities: Joi.any().custom(amenitiesCheck, 'amenity check').optional()
    })

    return schema.validate(data)
}

const amenitiesCheck = (value, helpers) => {

    for (const property in value) {
        if (typeof property !== 'string') {
            return helpers.error("any.invalid");
        }

        if (value[property] !== parseInt(value[property], 10)) {
            return helpers.error("any.invalid");
        }
    }

    return value;
}

module.exports.createValidation = createValidation
module.exports.updateValidation = updateValidation