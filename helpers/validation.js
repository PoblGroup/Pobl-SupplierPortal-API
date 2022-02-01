const Joi = require('joi')

const registerValidation = (user) => {
    const schema = Joi.object({
        Username: Joi.string().min(6).required().email(),
        Password: Joi.string().min(6).required(),
        Supplier_Id: Joi.string().min(6),
        IsAdmin: Joi.bool().required()
    })

    return schema.validate(user);
}


module.exports = {
    registerValidation
}