const Joi = require('joi');

const signupValidation = data => {

    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        username: Joi.string().min(3).required(),
        password: Joi.string().min(7)
            .regex(/^(?=.*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z])/)
            .message('Password must contain at least one upper case, two digits')
            .required(),
        role: Joi.string().optional(),
        // password_confirm: Joi.any()
        //     .equal(Joi.ref('password'))
        //     .required(),
    });

    return schema.validate(data)
}

const loginValidation = data => {

    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })

    return schema.validate(data)
}

const updateValidation = data => {

    const schema = Joi.object().keys({
        email: Joi.string().email().optional(),
        username: Joi.string().min(3).optional(),
        password: Joi.string().min(7)
            .regex(/^(?=.*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z])/)
            .message('Password must contain at least one upper case, two digits')
            .optional(),
    });

    return schema.validate(data)
}

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateValidation = updateValidation;