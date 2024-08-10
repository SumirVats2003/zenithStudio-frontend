import React from 'react'
import { useLocation } from 'react-router-dom'
import Editor from '../components/Editor'
import './ProblemPage.css'

const ProblemPage = () => {
  const location = useLocation()
  const { problem } = location.state

  return (
    <div className='problem-details-page'>
      <div className='problem-content'>
        <h1>{problem.title}</h1>
        <p>{problem.description}</p>
        <h3>Constraints:</h3>
        <p>{problem.constraints}</p>
        <h3>Examples:</h3>
        {problem.examples.map((example, index) => (
          <div key={index}>
            <p>
              <strong>Input:</strong> {example.input}
            </p>
            <p>
              <strong>Output:</strong> {example.output}
            </p>
            <p>
              <strong>Explanation:</strong> {example.explanation}
            </p>
          </div>
        ))}
      </div>
      <div className='editor-section'>
        <Editor
          language='cpp'
          code={`// Solve the problem here`}
          setCode={() => {}}
        />
      </div>
    </div>
  )
}

export default ProblemPage
