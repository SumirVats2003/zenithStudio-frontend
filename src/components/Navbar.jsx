import React from 'react'
import { AppBar, Toolbar, Typography, Link, Box } from '@mui/material'
import Logo from '../assets/zblack.png'

const Navbar = () => {
  return (
    <AppBar position='static' color='transparent' elevation={0}>
      <Toolbar>
        <Box
          component='img'
          src={Logo}
          alt='Zenith Studio Logo'
          sx={{ width: 50, height: 50, mr: 2 }}
        />
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Zenith Studio
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link
            href='/'
            color='inherit'
            underline='none'
            sx={{
              '&:hover': {
                color: theme => theme.palette.primary.main,
                textDecoration: 'underline',
              },
            }}
          >
            Home
          </Link>
          <Link
            href='/editor'
            color='inherit'
            underline='none'
            sx={{
              '&:hover': {
                color: theme => theme.palette.primary.main,
                textDecoration: 'underline',
              },
            }}
          >
            Editor
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
