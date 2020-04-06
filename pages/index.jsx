import React from 'react'
import { Link } from 'react-router-dom'

function HomePage () {
  return (
    <div className='home'>
      <h1>Hello, World!</h1>
      <Link to='/about'>About Page</Link>
    </div>
  )
}

export default HomePage
