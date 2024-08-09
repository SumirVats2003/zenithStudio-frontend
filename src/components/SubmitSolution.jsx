import React, { useState } from 'react'

const SubmitSolution = ({ onSubmit }) => {
  const [solution, setSolution] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(solution)
  }

  return (
    <form onSubmit={handleSubmit} className='submit-solution'>
      <textarea
        value={solution}
        onChange={e => setSolution(e.target.value)}
        placeholder='Write your solution here...'
      />
      <button type='submit'>Submit Solution</button>
    </form>
  )
}

export default SubmitSolution
