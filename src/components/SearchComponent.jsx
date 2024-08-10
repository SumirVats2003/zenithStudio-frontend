import React, { useState } from 'react'

const SearchComponent = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/problems/search/text?text=${searchQuery}`,
      )
      const data = await response.json()
      onSearchResults(data)
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  }

  return (
    <div className='search-container'>
      <input
        type='text'
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder='Search problems...'
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchComponent
