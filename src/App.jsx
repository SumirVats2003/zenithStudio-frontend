import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingSection from './pages/LandingSection'
import HomePage from './pages/Home'
import Playground from './pages/Playground'
import Arena from './pages/Arena'
import ProblemPage from './pages/ProblemPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingSection />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/playground' element={<Playground />} />
        <Route path='/arena' element={<Arena />} />
        <Route path='/problems/:problemId' element={<ProblemPage />} />
      </Routes>
    </Router>
  )
}

export default App
