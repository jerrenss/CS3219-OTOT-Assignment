const express = require('express')
const {
  getAllMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  setCookie,
  clearCookie,
} = require('../controllers/movies')
const router = express.Router()

router.get('/movies', getAllMovies)
router.post('/movie', addMovie)
router.put('/movie/:id', updateMovie)
router.delete('/movie/:id', deleteMovie)
router.get('/setCookie', setCookie)
router.get('/clearCookie', clearCookie)

module.exports = router
