const pool = require('../db')

function errorHandler(res, err) {
    switch (err.code) {
        case '23505':
            res.status(400).json({ errMsg: 'Movie already exists' })
            break
        case '23502':
            res.status(400).json({ errMsg: 'Missing fields in request' })
            break
        default:
            res.status(400).json({ errMsg: err })
    }
}

exports.getAllMovies = async (req, res) => {
    try {
        const allMovies = await pool.query('SELECT * FROM Movies;')
        res.status(200).json(allMovies.rows)
    } catch (err) {
        errorHandler(res, err)
    }
}

exports.addMovie = async (req, res) => {
    try {
        const {
            movie_name,
            director_name,
            year_released,
            duration,
            imdb_rating,
        } = req.body
        const newMovie = await pool.query(
            'INSERT INTO movies(movie_name, director_name, year_released, duration, imdb_rating) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
            [movie_name, director_name, year_released, duration, imdb_rating]
        )
        res.status(200).json(newMovie.rows)
    } catch (err) {
        errorHandler(res, err)
    }
}

exports.updateMovie = async (req, res) => {
    try {
        const {
            movie_name,
            director_name,
            year_released,
            duration,
            imdb_rating,
        } = req.body
        const { id } = req.params
        const updatedMovie = await pool.query(
            'UPDATE movies SET movie_name = $1, director_name = $2, year_released = $3, duration = $4, imdb_rating = $5 WHERE movie_id = $6 RETURNING *;',
            [
                movie_name,
                director_name,
                year_released,
                duration,
                imdb_rating,
                id,
            ]
        )
        res.status(200).json(updatedMovie.rows)
    } catch (err) {
        errorHandler(res, err)
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        const { id } = req.params
        const deletedMovie = await pool.query(
            'DELETE FROM movies WHERE movie_id = $1 RETURNING *;',
            [id]
        )
        res.status(200).json(deletedMovie.rows)
    } catch (err) {
        errorHandler(res, err)
    }
}
