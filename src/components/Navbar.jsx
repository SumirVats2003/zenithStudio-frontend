import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import Logo from '../assets/zblack.png'

const Navbar = ({ pgvisible, arvisible, bgvisible, isAuthenticated }) => {
  return (
    <div className='navbar'>
      <Link to='/home' className='navbar-logo'>
        <img src={Logo} alt='Zenith Studio Logo' className='logo' />
        <div className='navbar-title'>Zenith Studio</div>
      </Link>
      <div className='navbar-links'>
        {pgvisible ? (
          <Link to='/playground' className='nav-link'>
            Playground
          </Link>
        ) : (
          ''
        )}
        {arvisible ? (
          <Link to='/arena' className='nav-link'>
            Arena
          </Link>
        ) : (
          ''
        )}
        {bgvisible ? (
          <Link to='/battleground' className='nav-link'>
            Battleground
          </Link>
        ) : (
          ''
        )}
        {isAuthenticated ? (
          ''
        ) : (
          <Link to='/login' className='nav-link'>
            Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
