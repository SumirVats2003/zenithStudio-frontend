import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ProblemList from '../components/ProblemList'
import Pagination from '../components/Pagination'
import './Arena.css'

const Arena = () => {
  const [problems, setProblems] = useState([])
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const problemsPerPage = 20

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/problems`,
        )
        const data = await response.json()
        setProblems(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching problems:', error)
        setLoading(false)
      }
    }

    fetchProblems()
  }, [])

  const handleProblemSelect = problem => {
    setSelectedProblem(problem)
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
      <Navbar pgvisible={true} arvisible={false} bgvisible={true} />
      <div className='arena-container'>
        <div className='problem-table-container'>
          {loading ? (
            <div className='table-placeholder'>
              <table className='loading-table'>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Difficulty</th>
                    <th>Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(10)].map((_, index) => (
                    <tr key={index} className='loading-row'>
                      <td>Loading...</td>
                      <td>Loading...</td>
                      <td>Loading...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Arena
