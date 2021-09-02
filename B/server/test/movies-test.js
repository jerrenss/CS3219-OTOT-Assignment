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
describe('/GET book', () => {
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