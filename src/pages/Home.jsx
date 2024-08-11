import React from 'react'
import Navbar from '../components/Navbar'
import FeatureCard from '../components/FeatureCard'
import './Home.css'

const Home = () => {
  const isLoggedin = localStorage.getItem('authToken') ? true : false
  const desc = isLoggedin
    ? 'Compete in ongoing contests, view leaderboards, and host your own contests.'
    : 'Login to compete.'

  return (
    <div className='home-container'>
      <Navbar pgvisible={false} arvisible={false} bgvisible={false} />
      <div className='main-content'>
        <h1>Welcome to Zenith Studio</h1>
        <p>
          Explore the ultimate coding experience with our features designed to
          enhance your productivity and coding skills.
        </p>
        <div className='feature-cards'>
          <FeatureCard
            title='Code Playground'
            description='Play with code, run it with custom inputs, and see the results in real-time.'
            link='/playground'
          />
          <FeatureCard
            title='Coding Arena'
            description='Practice your coding skills by solving various problems and challenges.'
            link='/arena'
          />
          <FeatureCard
            title='Coding Battleground'
            description={desc}
            link='/battleground'
            disabled={!isLoggedin}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
