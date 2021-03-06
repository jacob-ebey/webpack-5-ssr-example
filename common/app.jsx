import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import loadable from '@loadable/component'
import { Helmet } from 'react-helmet-async'
import { Anchor, Nav, Text } from 'grommet'

import './app.module.css'

const HomePage = loadable(() => import('../pages/index'))
const AboutPage = loadable(() => import('../pages/about'))

function App () {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en-us' }}>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
          integrity='sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU='
          crossorigin='anonymous'
        />
      </Helmet>

      <Nav direction='row' background='brand' pad='medium'>
        <Anchor as={Link} to='/' hoverIndicator><Text>Home</Text></Anchor>
        <Anchor as={Link} to='/about' hoverIndicator><Text>About</Text></Anchor>
      </Nav>

      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/about' component={AboutPage} />
      </Switch>
    </>
  )
}

export default App
