import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import './Auth.css'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
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
    // You can add your registration logic here, such as calling an API.
    console.log('Registration data:', formData)
  }

  return (
    <>
      <Navbar pgvisible={true} bgvisible={true} arvisible={true} />
      <div className='auth-container'>
        <h1>Register</h1>
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
            Registered? <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default RegisterPage
