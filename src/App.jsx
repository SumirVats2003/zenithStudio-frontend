import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingSection from './components/LandingSection'
import HomePage from './pages/Home'
import CodeEditor from './components/CodeEditor'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingSection />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/editor' element={<CodeEditor />} />
      </Routes>
    </Router>
  )
}

export default App
