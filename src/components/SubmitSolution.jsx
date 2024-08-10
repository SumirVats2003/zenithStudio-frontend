import React, { useState } from 'react'
import './SubmitSolution.css'

const SubmitSolution = ({ onSubmit }) => {
  const [solution, setSolution] = useState('')

  const handleSubmit = () => {
    onSubmit(solution)
  }

  return (
    <div className='submit-solution-container'>
      <textarea
        value={solution}
        onChange={e => setSolution(e.target.value)}
        placeholder='Enter your solution here...'
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default SubmitSolution
