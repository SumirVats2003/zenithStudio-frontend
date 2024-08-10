import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import Logo from '../assets/zblack.png'

const Navbar = ({ pgvisible, arvisible, bgvisible }) => {
  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem('authToken') ? true : false

  const handleLogout = () => {
    // Clear authentication state (e.g., remove tokens or user data)
    // Redirect to the login page or home page
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  return (
    <div className='navbar'>
      <Link to='/home' className='navbar-logo'>
        <img src={Logo} alt='Zenith Studio Logo' className='logo' />
        <div className='navbar-title'>Zenith Studio</div>
      </Link>
      <div className='navbar-links'>
        {pgvisible && (
          <Link to='/playground' className='nav-link'>
            Playground
          </Link>
        )}
        {arvisible && (
          <Link to='/arena' className='nav-link'>
            Arena
          </Link>
        )}
        {bgvisible && (
          <Link to='/battleground' className='nav-link'>
            Battleground
          </Link>
        )}
        {isAuthenticated ? (
          <button onClick={handleLogout} className='nav-link'>
            Logout
          </button>
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
