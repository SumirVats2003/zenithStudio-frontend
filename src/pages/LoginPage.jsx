import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Auth.css'

const LoginPage = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      )
      const data = await response.json()

      if (data.success) {
        // Set authentication state to true
        setIsAuthenticated(true)

        // Optionally, store authentication data (like tokens) in local storage
        // localStorage.setItem('authToken', data.token);

        navigate('/home') // Redirect to the home page or another protected page
      } else {
        alert('Login failed. Please check your username and password.')
      }
    } catch (error) {
      console.error('Error logging in:', error)
      alert('An error occurred during login.')
    }
  }

  return (
    <>
      <Navbar pgvisible={true} bgvisible={true} arvisible={true} />
      <div className='auth-container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type='submit'>Login</button>
        </form>
      </div>
    </>
  )
}

export default LoginPage
