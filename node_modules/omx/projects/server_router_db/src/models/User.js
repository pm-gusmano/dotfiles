const Model = require('./Model')
const bcrypt = require('bcrypt')
const BCRYPT_ROUNDS = 12

class User extends Model {

    async $beforeInsert(context){
        await super.$beforeInsert(context)
        this.user_id = `US${Math.floor(Math.random() * 9999999999999)}`
        if(this.password) this.password = await bcrypt
            .hash(this.password, BCRYPT_ROUNDS)
    }

    async $beforeUpdate(context){
        await super.$beforeInsert(context)
        if(this.password) this.password = await bcrypt
            .hash(this.password, BCRYPT_ROUNDS)
    }

    async verifyPassword(password){
        return await bcrypt.compare(password, this.password)    
    }

    static get relationMappings(){
        
        const Role = require('./Role')
        const Token = require('./Token')

        return {
            tokens:{
                relation: Model.HasManyRelation,
                modelClass: Token,
                join:{
                    from:'users.id',
                    to:'tokens.user_id'
                }
            },
            roles: {
                relation: Model.ManyToManyRelation,
                modelClass: Role,
                join: {
                    from: 'users.id',
                    to: 'roles.id',
                    through: {
                        from: 'user_roles.user_id',
                        to: 'user_roles.role_id'
                    }
                }
            }
        }
    }
    
}

module.exports = User