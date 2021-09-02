const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const { errorHandler, notFound } = require('./middleware/middleware')
const movieRoutes = require('./routes/movies')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())

app.get('/', (req, res) => {
  res.json({
    route: 'Welcome to the NodeJS app!',
  })
})
app.use('/api', movieRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 4000
const ENV = process.env.NODE_ENV

app.listen(PORT, () => {
  console.log(`${ENV} environment listening on port: ${PORT}`)
})

module.exports = app
