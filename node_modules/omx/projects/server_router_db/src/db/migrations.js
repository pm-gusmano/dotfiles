module.exports = {
    users: (table) => {
        table.increments().primary()
        table.string('userId').unique().notNullable()
        table.string('username').notNullable().unique()
        table.date('birth_date', 255).notNullable()
        table.string('email').notNullable().unique()
        table.string('password').notNullable()
        table.boolean('confirmed').defaultTo(false)
        table.boolean('suspended').defaultTo(false)
        table.boolean('disabled').defaultTo(false)
        table.timestamps(true, true)
    }, 

    roles: (table) => {
        table.increments().primary()
        table.string('name').unique().notNullable()
        table.text('description')
        table.timestamps(true, true)
    },

    user_roles: (table) => {
        table.increments().primary()
        table.unique(['user_id', 'role_id'])
        table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').index().notNullable()
        table.integer('role_id').references('id').inTable('roles').onDelete('CASCADE').index().notNullable()
        table.timestamps(true, true)
    } 
}