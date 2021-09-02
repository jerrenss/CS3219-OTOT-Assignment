const { Pool } = require('pg')
const dotenv = require('dotenv')
dotenv.config()

// const connectionString = process.env.DB_CONNECTION_STRING
const connectionString =
    'postgres://OTOT-B-USER:OTOT-B-PW@localhost:5433/OTOT-B'

const pool = new Pool({
    connectionString,
})

console.log('Initialised PostgreSQL connection pool')

module.exports = pool
