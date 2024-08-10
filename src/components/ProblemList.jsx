import React from 'react'
import './ProblemList.css'

const ProblemList = ({ problems, onSelect }) => {
  return (
    <div className='problem-container'>
      <table className='problem-table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {problems.map(problem => (
            <tr key={problem.id} onClick={() => onSelect(problem)}>
              <td>{problem.title}</td>
              <td>{problem.difficulty || 'Medium'}</td>
              <td>
                {problem.tags.map((tag, index) => (
                  <span key={index}>
                    {tag}
                    {index < problem.tags.length - 1 && ', '}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProblemList
