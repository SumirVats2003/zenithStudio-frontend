import React from 'react'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  useTheme,
} from '@mui/material'
import { motion } from 'framer-motion'

const FeatureCard = ({ title, description, link, disabled = false }) => {
  const theme = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card
        sx={{
          background: theme =>
            `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
          border: 1,
          borderRadius: 10,
          transition: 'transform 0.3s',
          display: 'flex',
          flexDirection: 'column',
          height: 350,
          width: 500,
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      >
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant='h4' component='div' gutterBottom>
            {title}
          </Typography>
          <Typography variant='body2'>{description}</Typography>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <Button size='medium' href={link} color='primary' disabled={disabled}>
            {disabled ? 'Coming Soon' : 'Explore'}
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  )
}

export default FeatureCard
