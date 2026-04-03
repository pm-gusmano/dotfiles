const { ValidationError } = require('joi')

module.exports = async (err, ctx, next) => {

    if(err instanceof ValidationError){
        const { details, _original } = err
        ctx.cargo.original(_original).state('validation').status(422)
        details.map(d => ctx.cargo.loadmsg(d.context.key, d.message))
        ctx.cargo
    }
}