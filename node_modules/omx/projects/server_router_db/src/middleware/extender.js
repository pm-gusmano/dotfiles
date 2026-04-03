const { ValidationError } = require('joi')
const { UniqueViolationError } = require('objection')
const { JsonWebTokenError } = require('jsonwebtoken')

module.exports = async (err, ctx, next) => {

    if(err instanceof ValidationError){
        const { details, _original } = err
        ctx.cargo.original(_original).state('validation').status(422)
        details.map(d => ctx.cargo.loadmsg(d.context.key, d.message))
        ctx.cargo
    }
    
    if(err instanceof UniqueViolationError){
        let key = err.columns.pop()
        ctx.cargo.original(ctx.request.body).state('validation').status(422)
        ctx.cargo.loadmsg(key, `this ${key} is already taken`)
    }
    
    if(err instanceof JsonWebTokenError){
        if(err.message == 'invalid signature') ctx.cargo.status(401).msg('invalid token signature')
        if(err.message == 'jwt expired') ctx.cargo.status(401).msg('token expired')
        if(err.message == 'jwt malformed') ctx.cargo.status(401).msg('invalid token format')
        if(err.message == 'jwt must be provided') ctx.cargo.status(401).msg('token missing')
    }
}