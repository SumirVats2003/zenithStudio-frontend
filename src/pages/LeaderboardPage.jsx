import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './LeaderboardPage.css'
import Navbar from '../components/Navbar'

const LeaderboardPage = () => {
  const { contestId } = useParams()
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/contests/${contestId}/leaderboard`,
        )
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard')
        }
        const data = await response.json()
        console.log('Leaderboard Data:', data) // Log the data for debugging
        setLeaderboard(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [contestId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <Navbar pgvisible={true} bgvisible={true} arvisible={true} />
      <div className='leaderboard-page-container'>
        <h1>Leaderboard</h1>
        <table className='leaderboard-table'>
          <thead>
            <tr>
              <th>Username</th>
              <th>Submission Time</th>
              <th>Correct</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(entry => (
              <tr key={entry.id}>
                <td>{entry.username}</td>
                <td>{new Date(entry.submissionTime).toLocaleString()}</td>
                <td>{entry.correct ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default LeaderboardPage
