const { development } = require('./../../knexfile')
const knex = require('knex')(development)
const { Model } = require('objection')
const { OMX } = require('objection-mixin')
Model.knex(knex)


class BaseModel extends OMX(Model) {
    
    $formatJson(json) {
        json = super.$formatJson(json)
        delete json.user_id
        delete json.password
        return json
    }
}

module.exports = BaseModel