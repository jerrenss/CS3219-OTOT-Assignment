import React from 'react'
import { Box, Button, Link, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Movies from './Movies'
import theme from '../../theme'
import { setCookie, clearCookie } from '../../api/movies'

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
    marginBottom: '16px',
  },
  copyright: {
    marginTop: theme.spacing(1),
    color: '#FFFFFF',
    fontWeight: 500,
  },
}))

const handleSetCookie = () => {
  setCookie()
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => alert(err))
}

const handleClearCookie = () => {
  clearCookie()
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => alert(err))
}

const Copyright = () => {
  const classes = useStyles()

  return (
    <Typography className={classes.copyright} variant="body2" align="center">
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
      <Button variant="contained" onClick={handleSetCookie}>
        Set Cookie
      </Button>
      <hr />
      <Button variant="contained" onClick={handleClearCookie}>
        Clear Cookie
      </Button>
    </Box>
  )
}

export default Home
