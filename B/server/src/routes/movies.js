const express = require('express')
const {
    getAllMovies,
    addMovie,
    updateMovie,
    deleteMovie,
} = require('../controllers/movies')
const router = express.Router()

router.get('/movies', getAllMovies)
router.post('/movie', addMovie)
router.put('/movie/:id', updateMovie)
router.delete('/movie/:id', deleteMovie)

module.exports = router
