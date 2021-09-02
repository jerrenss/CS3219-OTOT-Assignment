SET TIMEZONE = 'Asia/Singapore';

CREATE TABLE IF NOT EXISTS Movies (
	movie_id SERIAL PRIMARY KEY, 
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	movie_name TEXT NOT NULL UNIQUE,
	director_name TEXT NOT NULL,
	year_released SMALLINT NOT NULL,
	duration SMALLINT NOT NULL,
	imdb_rating NUMERIC NOT NULL
);
