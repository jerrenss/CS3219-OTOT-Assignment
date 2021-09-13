const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const { errorHandler, notFound } = require('./middleware/middleware')
const movieRoutes = require('./routes/movies')

const app = express()

app.use(cors({ credentials: true, origin: 'https://upskilltoday.org' }))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json({
    data: 'Welcome to OTOT-B NodeJS app!',
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
