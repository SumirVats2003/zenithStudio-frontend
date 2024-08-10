import React from 'react'
import { useParams } from 'react-router-dom'
import Editor from '../components/Editor'
import './ProblemDetails.css'

const ProblemDetails = ({ problems }) => {
  const { id } = useParams()
  const problem = problems.find(p => p.id === id)

  if (!problem) {
    return <div>Problem not found</div>
  }

  return (
    <div className='problem-details-container'>
      <h1>{problem.title}</h1>
      <p>{problem.description}</p>
      <div className='examples'>
        <h3>Examples</h3>
        {problem.examples.map((example, index) => (
          <div key={index}>
            <p>Input: {example.input}</p>
            <p>Output: {example.output}</p>
            <p>Explanation: {example.explanation}</p>
          </div>
        ))}
      </div>
      <Editor language={problem.language} code={problem.solution} />
    </div>
  )
}

export default ProblemDetails
