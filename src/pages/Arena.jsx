import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ProblemList from '../components/ProblemList'
import Pagination from '../components/Pagination'
import SearchComponent from '../components/SearchComponent'
import './Arena.css'

const Arena = () => {
  const [problems, setProblems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState('asc')
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
    window.location.href = `/problems/${problem.id}`
  }

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
  }

  const handleSort = () => {
    const difficultyOrder = ['EASY', 'MEDIUM', 'HARD']
    const sortedProblems = [...problems].sort((a, b) => {
      const comparison =
        difficultyOrder.indexOf(a.difficulty) -
        difficultyOrder.indexOf(b.difficulty)
      return sortOrder === 'asc' ? comparison : -comparison
    })
    setProblems(sortedProblems)
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const handleSearchResults = searchResults => {
    setProblems(searchResults)
    setCurrentPage(1)
  }

  return (
    <>
      <Navbar pgvisible={true} arvisible={false} bgvisible={true} />
      <div className='arena-container'>
        <div className='button-container'>
          <SearchComponent onSearchResults={handleSearchResults} />
          <button
            className='upload-button'
            onClick={() => (window.location.href = '/upload')}
          >
            Upload Problem
          </button>
        </div>
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
                problems={problems.slice(
                  (currentPage - 1) * problemsPerPage,
                  currentPage * problemsPerPage,
                )}
                onSelect={handleProblemSelect}
                onSort={handleSort}
                sortOrder={sortOrder}
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
