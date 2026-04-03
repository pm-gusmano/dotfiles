const autoBind = require('auto-bind')

class Controller {
    constructor(model){
        this.model = model
        this.modelName = this.constructor.name.toLocaleLowerCase().replace('controller', '')
        autoBind(this)
    }

    async loadInstance(id, ctx, next){
        const item = await this.model.query().where('id', id).first()
        if(!item) ctx.cargo.msg(`invalid ${this.modelName} id`).error(422)
        ctx.state[this.modelName] = item
        await next()
    }

    async index(ctx){
        const items = await this.model.query() 
        ctx.body = ctx.cargo.payload(items)
    }

    async view(ctx){
        ctx.body = ctx.cargo.payload(ctx.state[this.modelName])
    }

    async create(ctx){
        const item = await this.model.query().insert(ctx.request.body).returning('*')
        ctx.body = ctx.cargo.payload(item).msg(`${this.modelName} created!`)
    }

    async update(ctx){
        const body = ctx.request.body
        const item = await ctx.state[this.modelName].$query().patch(body).returning('*')
        ctx.body = ctx.cargo.payload(item).msg(`${this.modelName} updated!`)
    }

    async delete(ctx){
        const item = await ctx.state[this.modelName].$query().delete()
        ctx.body = ctx.cargo.payload(item).msg(`${this.modelName} deleted!`)
    }
}

module.exports = Controller