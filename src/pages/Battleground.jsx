import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import './Battleground.css'

const Battleground = () => {
  const [contests, setContests] = useState([])

  useEffect(() => {
    // Fetch contests from the API
    const fetchContests = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/contests/all`,
        )
        const data = await response.json()
        setContests(data)
      } catch (error) {
        console.error('Error fetching contests:', error)
      }
    }

    fetchContests()
  }, [])

  const formatStartTime = startTime => {
    const date = new Date(startTime)
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <>
      <Navbar pgvisible={true} arvisible={true} bgvisible={false} />
      <div className='battleground-container'>
        <h1>Coding Battleground</h1>
        <div className='battleground-description'>
          <p>
            Welcome to the Coding Battleground! Compete against others in
            real-time coding contests, climb the leaderboards, and prove your
            coding prowess.
          </p>
        </div>
        <div className='battleground-actions'>
          <button className='create-contest-btn'>Create a Contest</button>
          <button className='view-leaderboard-btn'>View Leaderboard</button>
        </div>
        <div className='ongoing-contests'>
          <h2>Ongoing Contests</h2>
          <div className='contest-list'>
            {contests.length > 0 ? (
              contests.map(contest => (
                <div key={contest._id} className='contest-card'>
                  <h3>{contest.contestName}</h3>
                  <p>{contest.description}</p>
                  <p>Duration: {contest.timeDuration} minutes</p>
                  <p>Starts: {formatStartTime(contest.startTime)}</p>
                  <button className='join-contest-btn'>Join Now</button>
                </div>
              ))
            ) : (
              <p>No ongoing contests available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Battleground
