const Joi = require('joi');

const paramValidation = data => {

    const schema = Joi.object().keys({
        id: Joi.number().integer().required(),
    })

    return schema.validate(data)
}

const searchParamValidation = data => {

    const schema = Joi.object().keys({
        name: Joi.string().required(),
    })

    return schema.validate(data)
}

const imageUploadValidation = data => {

    const schema = Joi.object().keys({
        apartmentId: Joi.number().integer().required(),
    })

    return schema.validate(data)
}

module.exports.paramValidation = paramValidation;
module.exports.searchParamValidation = searchParamValidation;
module.exports.imageUploadValidation = imageUploadValidation;