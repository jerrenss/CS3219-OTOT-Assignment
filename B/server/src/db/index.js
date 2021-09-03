const { Pool } = require('pg')
const dotenv = require('dotenv')
dotenv.config()

const config = {
  DEV: 'postgres://OTOT-B-USER:OTOT-B-PW@database:5432/OTOT-B',
  TEST: 'postgres://OTOT-B-USER:OTOT-B-PW@localhost:5434/OTOT-B',
  PROD: process.env.DB_CONNECTION_STRING,
}

const connectionString = config[process.env.NODE_ENV]

const pool = new Pool({
  connectionString,
})

console.log('Initialised PostgreSQL connection pool')

module.exports = pool
