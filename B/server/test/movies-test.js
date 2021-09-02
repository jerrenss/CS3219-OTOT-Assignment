// Configure environment variables for testing
process.env.NODE_ENV = 'TEST'
process.env.PORT = 5000

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../src')
let should = chai.should()

chai.use(chaiHttp)

/*
 * Test the /GET route
 */
describe('/GET movies', () => {
  it('it should GET all the movies', (done) => {
    chai
      .request(server)
      .get('/api/movies')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(0)
        done()
      })
  })
})

/*
 * Test the /POST route
 */
describe('/POST movie', () => {
  it('it should POST a movie to database', (done) => {
    let movie = {
      movie_name: 'Spiderman: Far From Home',
      director_name: 'Jon Watts',
      year_released: 2019,
      duration: 130,
      imdb_rating: 7.5,
    }
    chai
      .request(server)
      .post('/api/movie')
      .send(movie)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(1)
        done()
      })
  })
})

describe('/GET movies', () => {
  it('it should GET all the movies', (done) => {
    chai
      .request(server)
      .get('/api/movies')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(1)
        done()
      })
  })
})
