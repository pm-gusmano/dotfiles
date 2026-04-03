const autoBind = require('auto-bind')

class Controller {
    constructor(model){
        this.model = model
        this.modelName = this.constructor.name.toLocaleLowerCase().replace('controller', '')
        autoBind(this)
    }

    async loadInstance(id, ctx, next){
        
        await next()
    }
}

module.exports = Controller