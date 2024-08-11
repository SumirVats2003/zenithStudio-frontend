import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import './Battleground.css'
import { Link } from 'react-router-dom'

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

  const formatEndTime = endTime => {
    const date = new Date(endTime)
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getContestStatus = (startTime, endTime) => {
    const now = new Date()
    const start = new Date(startTime)
    const end = new Date(endTime)

    if (now > end) return 'finished'
    if (now >= start && now <= end) return 'ongoing'
    return 'upcoming'
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
          <Link to={'/createcontest'}>
            <button className='create-contest-btn'>Create a Contest</button>
          </Link>
          {/* <button className='view-leaderboard-btn'>View Leaderboard</button> */}
        </div>
        <div className='ongoing-contests'>
          <h2>Contests</h2>
          <div className='contest-list'>
            {contests.length > 0 ? (
              contests.map(contest => {
                const status = getContestStatus(
                  contest.startTime,
                  contest.endTime,
                )
                const statusClass =
                  status === 'ongoing'
                    ? 'status-ongoing'
                    : status === 'upcoming'
                    ? 'status-upcoming'
                    : 'status-finished'

                return (
                  <div key={contest._id} className='contest-card'>
                    <h3>{contest.contestName}</h3>
                    <p>{contest.description}</p>
                    {status !== 'finished' && (
                      <>
                        <p>Duration: {contest.timeDuration} minutes</p>
                        <p>Starts: {formatStartTime(contest.startTime)}</p>
                        <p>Ends: {formatEndTime(contest.endTime)}</p>
                      </>
                    )}
                    {status === 'ongoing' && (
                      <Link to={`/contest/${contest._id}`}>
                        <button className='join-contest-btn'>Join Now</button>
                      </Link>
                    )}
                    <div className={`contest-status ${statusClass}`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </div>
                  </div>
                )
              })
            ) : (
              <p>No contests available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Battleground
