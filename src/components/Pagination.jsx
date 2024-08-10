import React from 'react'
import './Pagination.css'

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageClick = pageNumber => {
    onPageChange(pageNumber)
  }

  return (
    <div className='pagination'>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(index + 1)}
          className={index + 1 === currentPage ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}

export default Pagination
