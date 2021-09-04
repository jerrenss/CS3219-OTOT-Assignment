// Configure environment variables for testing
process.env.NODE_ENV = 'TEST'
process.env.PORT = 5000

//Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src')
const should = chai.should()
const expect = chai.expect

chai.use(chaiHttp)

const movieKeys = [
  'movie_id',
  'created_at',
  'movie_name',
  'director_name',
  'year_released',
  'duration',
  'imdb_rating',
]

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
        expect(res.body[0]).to.have.all.keys(movieKeys)
        done()
      })
  })
})

/*
 * Test the /PUT route
 */
describe('/PUT movie', () => {
  it('it should PUT a movie in database', (done) => {
    let updatedMovie = {
      movie_name: 'Spiderman: Far From Home 2',
      director_name: 'Jon Watts',
      year_released: 2019,
      duration: 130,
      imdb_rating: 8.2,
    }
    chai
      .request(server)
      .put('/api/movie/1')
      .send(updatedMovie)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(1)
        expect(res.body[0]).to.have.all.keys(movieKeys)
        expect(res.body[0]).to.have.property(
          'movie_name',
          'Spiderman: Far From Home 2'
        )
        expect(res.body[0]).to.have.property('imdb_rating', '8.2')
        done()
      })
  })
})

/*
 * Test the /DELETE route
 */
describe('/DELETE movie', () => {
  it('it should DELETE a movie in database', (done) => {
    chai
      .request(server)
      .delete('/api/movie/1')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(1)
        expect(res.body[0]).to.have.all.keys(movieKeys)
        done()
      })
  })
})

/*
 * Test the /GET route again to complete workflow
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
