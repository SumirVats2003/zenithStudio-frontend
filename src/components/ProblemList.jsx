import React from 'react'

const ProblemList = ({ problems, onSelect }) => {
  return (
    <div className='problem-list'>
      <h2>Available Problems</h2>
      <ul>
        {problems.map(problem => (
          <li key={problem.id} onClick={() => onSelect(problem)}>
            {problem.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProblemList
