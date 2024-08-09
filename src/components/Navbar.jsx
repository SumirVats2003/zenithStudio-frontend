import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const Navbar = () => {
  return (
    <AppBar position='static' color='transparent' elevation={0}>
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Zenith Studio
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color='inherit' href='/'>
            Home
          </Button>
          <Button color='inherit' href='/codeeditor'>
            Code Editor
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
