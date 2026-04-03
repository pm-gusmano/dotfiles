const Controller = require('./Controller')


class UserController extends Controller {

    async loadFromUsername(ctx, next){

        return next()
    }
    
    async checkPassword(ctx, next){

        return next()
    }
}
module.exports = () => new UserController()