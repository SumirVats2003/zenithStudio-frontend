import React from 'react'

const ProblemDetails = ({ problem }) => {
  return (
    <div className='problem-details'>
      <h2>{problem.title}</h2>
      <p>{problem.description}</p>
    </div>
  )
}

export default ProblemDetails
