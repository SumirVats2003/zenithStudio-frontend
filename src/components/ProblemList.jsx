import React from 'react'
import './ProblemList.css'

const ProblemList = ({ problems, onSelect, onSort, sortOrder }) => {
  const getDifficultyColor = difficulty => {
    switch (difficulty) {
      case 'EASY':
        return '#00ff6e'
      case 'MEDIUM':
        return '#eaff00'
      case 'HARD':
        return '#ff0008'
      default:
        return 'white'
    }
  }

  return (
    <div className='problem-container'>
      <table className='problem-table'>
        <thead>
          <tr>
            <th>Title</th>
            <th onClick={onSort} style={{ cursor: 'pointer' }}>
              Difficulty {sortOrder === 'asc' ? '▲' : '▼'}
            </th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {problems.map(problem => (
            <tr key={problem.id} onClick={() => onSelect(problem)}>
              <td>{problem.title}</td>
              <td
                style={{
                  color: getDifficultyColor(problem.difficulty),
                  textAlign: 'center',
                }}
              >
                {problem.difficulty || 'Medium'}
              </td>
              <td style={{ textAlign: 'center' }}>
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
