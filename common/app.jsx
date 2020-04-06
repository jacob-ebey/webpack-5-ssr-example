import React from 'react'
import { Route, Switch } from 'react-router-dom'
import loadable from '@loadable/component'
import { Helmet } from 'react-helmet-async'

const HomePage = loadable(() => import('../pages/index'))
const AboutPage = loadable(() => import('../pages/about'))

function App () {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en-us' }}>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Helmet>

      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/about' component={AboutPage} />
      </Switch>
    </>
  )
}

export default App
