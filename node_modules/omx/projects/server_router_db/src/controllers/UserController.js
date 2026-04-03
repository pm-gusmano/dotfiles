const Controller = require('./Controller')
const { User } = require('./../models')

class UserController extends Controller {

    async loadFromUsername(ctx, next){
        const { username } = ctx.request.body

        const user = await this.model.query()
            .where('username', username)
            .orWhere('email', username)
            .first()
        if(!user) ctx.cargo.original(ctx.request.body).state('validation')
            .loadmsg('username', 'username not found').error(422)
        ctx.state.$user = user
        return next()
    }

    async checkPassword(ctx, next){
        const { password } = ctx.request.body
        if(!await ctx.state.$user.verifyPassword(password)){
            ctx.cargo.original(ctx.request.body).state('validation')
            .loadmsg('password', 'invalid password').error(422)
        }
        return next()
    }

    async authenticate(ctx){
        const token = await ctx.state.$user
            .$relatedQuery('tokens')
            .insert({useragent: ctx.headers['user-agent']})

        const { userId } = ctx.state.$user
        ctx.body = ctx.cargo.msg('login was successful')
            .payload({
                user: ctx.state.$user,
                access: ctx.AccessToken.sign({userId}),
                refresh: await token.renderRefreshToken(),
            })
    }

}

module.exports = () => new UserController(User)