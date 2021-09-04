import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { getMovies, addMovie, updateMovie, deleteMovie } from '../../api/movies'

const columns = [
  { title: 'Title', field: 'movie_name' },
  {
    title: 'ID',
    field: 'movie_id',
    type: 'numeric',
    editable: 'never',
    defaultSort: 'asc',
  },
  { title: 'Director', field: 'director_name' },
  { title: 'Released', field: 'year_released', type: 'numeric' },
  { title: 'Duration', field: 'duration', type: 'numeric' },
  { title: 'IMDB Rating', field: 'imdb_rating', type: 'numeric' },
]

const Movies = () => {
  const [movies, setMovies] = useState([])
  useEffect(() => {
    getMovies()
      .then((res) => res.json())
      .then((data) => {
        setMovies(data)
      })
      .catch((err) => alert(err))
  }, [])

  return (
    <MaterialTable
      title="Movies"
      columns={columns?.map((c) => ({
        ...c,
        tableData: undefined,
      }))}
      data={movies}
      style={{ width: 1000 }}
      options={{
        paging: true,
        pageSize: 10,
        emptyRowsWhenPaging: false,
        pageSizeOptions: [5, 10, 20],
      }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve()
              const data = [...movies]
              data.push(newData)
              setMovies(data)
              addMovie(newData)
                .then((res) => {
                  if (res.ok) {
                    return res.json()
                  } else {
                    throw new Error('Error adding movie')
                  }
                })
                .then((data) => {
                  window.location.reload()
                  return data
                })
                .catch((err) => {
                  alert(err)
                  window.location.reload()
                })
            }, 600)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve()
              const data = [...movies]
              data[data.indexOf(oldData)] = newData
              setMovies(data)
              updateMovie(oldData.movie_id, newData)
                .then((res) => {
                  if (res.ok) {
                    return res.json()
                  } else {
                    throw new Error('Error updating movie')
                  }
                })
                .then((data) => data)
                .catch((err) => {
                  alert(err)
                  window.location.reload()
                })
            }, 600)
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve()
              const data = [...movies]
              data.splice(data.indexOf(oldData), 1)
              setMovies(data)
              deleteMovie(oldData.movie_id)
                .then((res) => {
                  if (res.ok) {
                    return res.json()
                  } else {
                    throw new Error('Error deleting movie')
                  }
                })
                .then((data) => data)
                .catch((err) => {
                  alert(err)
                  window.location.reload()
                })
            }, 600)
          }),
      }}
    />
  )
}

export default Movies
