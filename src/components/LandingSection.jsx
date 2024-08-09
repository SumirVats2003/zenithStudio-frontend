import React from 'react'
import { Box, Typography, Button, useTheme } from '@mui/material'
import { keyframes } from '@emotion/react'
import Navbar from './Navbar'
import Logo from '../assets/zblack.png'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const LandingSection = () => {
  const theme = useTheme()

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 64px)',
          backgroundColor: theme.palette.background.default,
          textAlign: 'center',
          animation: `${fadeIn} 1s ease-in-out`,
          p: 3,
        }}
      >
        <Box
          component='img'
          src={Logo}
          alt='Zenith Studio Logo'
          sx={{
            width: 150,
            height: 150,
            mb: 2,
            animation: `${slideIn} 1s ease-out`,
          }}
        />
        <Typography
          variant='h2'
          component='h1'
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 'bold',
            mb: 2,
            animation: `${slideIn} 1s ease-out`,
          }}
        >
          Zenith Studio
        </Typography>
        <Typography
          variant='h5'
          component='p'
          sx={{
            color: theme.palette.text.secondary,
            mb: 4,
            maxWidth: 600,
            animation: `${slideIn} 1s ease-out`,
          }}
        >
          Welcome to Zenith Studio, the ultimate code editor for developers.
          Experience seamless coding with our intuitive UI, powerful features,
          and support for multiple programming languages. Start coding in style
          with Zen-like focus and productivity.
        </Typography>
        <Button
          variant='contained'
          color='primary'
          size='large'
          sx={{
            animation: `${slideIn} 1s ease-out`,
          }}
          onClick={() => {
            window.location.href = '/editor'
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  )
}

export default LandingSection
