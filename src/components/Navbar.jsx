import React from 'react'
import { AppBar, Toolbar, Typography, Link, Box } from '@mui/material'
import Logo from '../assets/zblack.png'

const Navbar = () => {
  return (
    <AppBar position='static' color='transparent' elevation={0}>
      <Toolbar>
        <Link href='/home'>
          <Box
            component='img'
            src={Logo}
            alt='Zenith Studio Logo'
            sx={{ width: 50, height: 50, mr: 2 }}
          />
        </Link>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Zenith Studio
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
