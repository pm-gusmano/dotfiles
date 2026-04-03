module.exports = {

    development: {
      client: 'sqlite3',
      connection: {
        filename: './src/db/dev.sqlite3'
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: './src/db/migrations'
      },
      seeds: {
        directory: './src/db/seeds'
      },
      useNullAsDefault: true
    }, 
}