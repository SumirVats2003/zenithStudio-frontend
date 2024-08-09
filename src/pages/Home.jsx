import React from 'react'
import { Box, Typography, Grid, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import FeatureCard from '../components/FeatureCard'

const Home = () => {
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
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: theme.palette.background.default,
          textAlign: 'center',
          p: 3,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Typography
            variant='h2'
            component='h1'
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 'bold',
              mb: 4,
            }}
          >
            Welcome to Zenith Studio
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Typography
            variant='h5'
            component='p'
            sx={{
              color: theme.palette.text.secondary,
              mb: 6,
              maxWidth: 600,
            }}
          >
            Explore the ultimate coding experience with our features designed to
            enhance your productivity and coding skills.
          </Typography>
        </motion.div>
        <Grid
          container
          spacing={1}
          justifyContent='center'
          alignItems='center'
          sx={{ flexGrow: 1 }}
        >
          <Grid item xs={12} sm={4} container justifyContent='center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <FeatureCard
                title='Code Playground'
                description='Play with code, run it with custom inputs, and see the results in real-time.'
                link='/editor'
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={4} container justifyContent='center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <FeatureCard
                title='Coding Arena'
                description='Practice your coding skills by solving various problems and challenges.'
                link='#'
                disabled
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={4} container justifyContent='center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <FeatureCard
                title='Coding Battleground'
                description='Compete in ongoing contests, view leaderboards, and host your own contests.'
                link='#'
                disabled
              />
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Home
