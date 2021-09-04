export const getMovies = () => {
  return fetch('/api/movies')
}

export const addMovie = (movie) => {
  return fetch('/api/movie', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  })
}

export const updateMovie = (id, movie) => {
  return fetch(`/api/movie/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  })
}

export const deleteMovie = (id) => {
  return fetch(`/api/movie/${id}`, {
    method: 'DELETE',
  })
}
