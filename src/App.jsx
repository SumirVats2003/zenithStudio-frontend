import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingSection from './pages/LandingSection'
import HomePage from './pages/Home'
import Playground from './pages/Playground'
import Arena from './pages/Arena'
import ProblemPage from './pages/ProblemPage'
import UploadPage from './pages/UploadPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Battleground from './pages/Battleground'
import CreateContest from './pages/CreateContest'
import ContestPage from './pages/ContestPage'
import LeaderboardPage from './pages/LeaderboardPage'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingSection />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/playground' element={<Playground />} />
        <Route path='/arena' element={<Arena />} />
        <Route path='/problems/:problemId' element={<ProblemPage />} />
        <Route path='/upload' element={<UploadPage />} />
        <Route
          path='/login'
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/battleground' element={<Battleground />} />
        <Route path='/createcontest' element={<CreateContest />} />
        <Route path='/contest/:contestId' element={<ContestPage />} />
        <Route
          path='/contests/:contestId/leaderboard'
          element={<LeaderboardPage />}
        />
      </Routes>
    </Router>
  )
}

export default App
