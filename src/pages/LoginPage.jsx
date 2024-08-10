import React, { useState } from 'react'
import './Auth.css'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // You can add your authentication logic here, such as calling an API.
    console.log('Login data:', formData)
  }

  return (
    <>
      <Navbar pgvisible={true} bgvisible={true} arvisible={true} />
      <div className='auth-container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
          <button type='submit'>Login</button>
          <p>
            New User? <Link to='/register'>Register</Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default LoginPage
