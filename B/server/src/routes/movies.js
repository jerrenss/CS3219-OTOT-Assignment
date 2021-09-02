const express = require('express');
const { getAllMovies } = require('../controllers/movies');
const router = express.Router();

router.get('/movies', getAllMovies);

module.exports = router;
