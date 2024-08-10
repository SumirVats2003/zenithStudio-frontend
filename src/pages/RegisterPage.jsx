import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
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
    setError('')
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      )

      const result = await response.json()

      if (result.success) {
        navigate('/login')
      } else {
        setError('Registration failed')
      }
    } catch (error) {
      console.error('Error during registration:', error)
      setError('An error occurred during registration.')
    }
  }

  return (
    <>
      <Navbar pgvisible={true} bgvisible={true} arvisible={true} />
      <div className='auth-container'>
        <h1>Register</h1>
        {error && <p className='error'>{error}</p>}
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
            Email:
            <input
              type='email'
              name='email'
              value={formData.email}
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
          <button type='submit'>Register</button>
          <p>
            Already registered? <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default RegisterPage
