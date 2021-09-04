const { Pool } = require('pg')
const dotenv = require('dotenv')
dotenv.config()

const config = {
  DEV: {
    host: 'database',
    port: 5432,
    user: 'OTOT-B-USER',
    password: 'OTOT-B-PW',
    database: 'OTOT-B',
  },
  TEST: {
    host: 'localhost',
    port: 5434,
    user: 'OTOT-B-USER',
    password: 'OTOT-B-PW',
    database: 'OTOT-B',
  },
  PROD: {
    host: '/cloudsql/cs3219-otot-324906:asia-southeast1:cs3219-otot-b-db-prod',
    user: 'postgres',
    password: 'OTOT-B-PW',
    database: 'OTOT-B',
    socketPath:
      '/cloudsql/cs3219-otot-324906:asia-southeast1:cs3219-otot-b-db-prod',
  },
}

const pool = new Pool(config[process.env.NODE_ENV])

console.log('Initialised PostgreSQL connection pool')

module.exports = pool
