import React from 'react'
import { Link } from 'react-router-dom'

const FeatureCard = ({ title, description, link, disabled }) => {
  return (
    <div className={`feature-card ${disabled ? 'disabled' : ''}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      {!disabled && (
        <Link to={link} className='feature-link'>
          Start Using!
        </Link>
      )}
    </div>
  )
}

export default FeatureCard
