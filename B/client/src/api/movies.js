const baseURL = 'https://api.upskilltoday.org'

export const getMovies = () => {
  return fetch(`${baseURL}/api/movies`, {
    credentials: 'include',
  })
}

export const addMovie = (movie) => {
  return fetch(`${baseURL}/api/movie`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  })
}

export const updateMovie = (id, movie) => {
  return fetch(`${baseURL}/api/movie/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  })
}

export const deleteMovie = (id) => {
  return fetch(`${baseURL}/api/movie/${id}`, {
    method: 'DELETE',
  })
}

export const setCookie = () => {
  return fetch(`${baseURL}/api/setCookie`, {
    credentials: 'include',
  })
}

export const clearCookie = () => {
  return fetch(`${baseURL}/api/clearCookie`, {
    credentials: 'include',
  })
}

export const extractCookie = () => {
  return fetch(`${baseURL}/api/extractCookie`, {
    credentials: 'include',
  })
}
