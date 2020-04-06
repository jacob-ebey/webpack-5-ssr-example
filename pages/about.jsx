import React from 'react'
import { Link } from 'react-router-dom'

function HomePage () {
  return (
    <div className='about'>
      <h1>About Page</h1>
      <Link to='/'>Home Page</Link>
    </div>
  )
}

export default HomePage
