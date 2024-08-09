import React from 'react'
import './LandingSection.css'
import Logo from '../assets/zblack.png'

const LandingSection = () => {
  return (
    <div className='landing-container'>
      <img src={Logo} alt='Zenith Studio Logo' className='landing-logo' />
      <h1 className='landing-title'>Zenith Studio</h1>
      <p className='landing-subtitle'>
        Welcome to Zenith Studio, the ultimate code editor for developers.
        Experience seamless coding with our intuitive UI, powerful features, and
        support for multiple programming languages. Start coding in style with
        Zen-like focus and productivity.
      </p>
      <button
        className='landing-button'
        onClick={() => {
          window.location.href = '/home'
        }}
      >
        Get Started
      </button>
    </div>
  )
}

export default LandingSection
