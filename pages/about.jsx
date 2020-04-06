import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function AboutPage () {
  return (
    <>
      <Helmet>
        <title>About</title>
        <meta name='description' content='Describing more about stuff.' />
      </Helmet>

      <div className='about'>
        <h1>About Page</h1>
        <Link to='/'>Home Page</Link>
      </div>
    </>
  )
}

export default AboutPage
