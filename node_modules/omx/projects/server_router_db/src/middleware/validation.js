const Joi = require('joi')

const schema = {

    createUser: Joi.object().options({ abortEarly: false, stripUnknown: true }).keys({
        username: Joi.string().required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
    }),

    createClient: Joi.object().options({ abortEarly: false, stripUnknown: true }).keys({
        name: Joi.string().required(),
    }),

    login: Joi.object().options({ abortEarly: false, stripUnknown: true }).keys({
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
    }),
}

const validate = (schema) => async (ctx, next) => {
    try {
        const body = ctx.request.body
        const { error, value } = schema.validate(body)
        if(error) ctx.throw(422, 'JoiValidationError', error)
        ctx.request.body = value
        await next()
    } catch (err) {
        ctx.throw(500, 'SystemError', err) 
    }
}

module.exports = {
    schema, 
    validate
}