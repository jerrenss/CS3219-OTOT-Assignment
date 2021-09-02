const pool = require('../db');

exports.getAllMovies = async (req, res) => {
  try {
    const allMovies = await pool.query('SELECT * FROM Movies;');
    res.status(200).json(allMovies.rows);
  } catch (err) {
    res.status(400).json({ errMsg: err });
  }
};
