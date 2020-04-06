import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function HomePage () {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className='home'>
        <h1>Hello, World!</h1>
        <Link to='/about'>About Page</Link>
      </div>
    </>
  )
}

export default HomePage
