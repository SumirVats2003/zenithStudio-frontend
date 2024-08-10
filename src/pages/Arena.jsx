import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ProblemList from '../components/ProblemList'
import Pagination from '../components/Pagination'
import './Arena.css'

const Arena = () => {
  const [problems, setProblems] = useState([])
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const problemsPerPage = 20

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
    // navigate to the problem details page (e.g., /problems/:id)
    window.location.href = `/problems/${problem.id}`
  }

  const indexOfLastProblem = currentPage * problemsPerPage
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage
  const currentProblems = problems.slice(
    indexOfFirstProblem,
    indexOfLastProblem,
  )

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <Navbar />
      <div className='arena-container'>
        <div className='problem-table-container'>
          <ProblemList
            problems={currentProblems}
            onSelect={handleProblemSelect}
          />
          <Pagination
            currentPage={currentPage}
            itemsPerPage={problemsPerPage}
            totalItems={problems.length}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}

export default Arena
