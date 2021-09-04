import React from 'react'
import { Box, Link, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Movies from './Movies'

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    backgroundImage: `url('home-background.jpeg')`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: '64px',
    textAlign: 'center',
  },
}))

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Gerren Seow
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const Home = () => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Typography variant="h2" className={classes.heading}>
        LetsBinge!
      </Typography>
      <Movies />
      <Copyright />
    </Box>
  )
}

export default Home
