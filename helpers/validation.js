const Joi = require('joi')

const registerValidation = (user) => {
    const schema = Joi.object({
        Username: Joi.string().min(6).required().email(),
        Password: Joi.string().min(6).required(),
        Supplier_Id: Joi.optional(),
        IsAdmin: Joi.bool().required()
    })

    return schema.validate(user);
}

const loginValidation = (user) => {
    const schema = Joi.object({
        Username: Joi.string().min(6).required().email(),
        Password: Joi.string().min(6).required()
    })

    return schema.validate(user);
}


module.exports = {
    registerValidation, 
    loginValidation
}