import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ProblemList from '../components/ProblemList'
import ProblemDetails from '../components/ProblemDetails'
import SubmitSolution from '../components/SubmitSolution'
import './Arena.css'

const Arena = () => {
  const [problems, setProblems] = useState([])
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [submissionResult, setSubmissionResult] = useState('')

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/problems`,
        )
        const data = await response.json()
        setProblems(data)
      } catch (error) {
        console.error('Error fetching problems:', error)
      }
    }

    fetchProblems()
  }, [])

  const handleProblemSelect = problem => {
    setSelectedProblem(problem)
  }

  const handleSolutionSubmit = async solution => {
    if (!selectedProblem) return

    const requestBody = {
      problemId: selectedProblem.id,
      solution: solution,
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/submit-solution`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        },
      )

      const result = await response.json()
      setSubmissionResult(`Result: ${result.message}`)
    } catch (error) {
      console.error('Error submitting solution:', error)
      setSubmissionResult('Error submitting solution.')
    }
  }

  return (
    <>
      <Navbar />
      <div className='arena-container'>
        <div className='left-column'>
          <ProblemList problems={problems} onSelect={handleProblemSelect} />
        </div>
        <div className='right-column'>
          {selectedProblem && (
            <>
              <ProblemDetails problem={selectedProblem} />
              <SubmitSolution onSubmit={handleSolutionSubmit} />
              <div className='submission-result'>{submissionResult}</div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Arena
