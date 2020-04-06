import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import styles from './index.module.css'

const QUERY = gql`
  query HomePageQuery {
    allFilms {
      films {
        id
        title
        releaseDate
      }
    }
  }
`

function HomePage () {
  const { data, loading } = useQuery(QUERY)

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name='description' content='The home page :D' />
      </Helmet>

      <div className={styles.home}>
        <h1>Hello, World!</h1>
        <Link to='/about'>About Page</Link>

        {!data && loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>
              <a
                href='https://github.com/graphql/swapi-graphql'
                rel='noopener noreferrer'
                target='_blank'
              >
                SWAPI
              </a>
              {' '}
              data loaded with apollo-client
            </p>
            <ul>
              {data.allFilms.films.map(film => (
                <li key={film.id}>{film.title} was published {film.releaseDate}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}

export default HomePage
