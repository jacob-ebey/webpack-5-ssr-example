import React from 'react'
import { Route, Switch } from 'react-router-dom'
import loadable from '@loadable/component'

// import HomePage from '../pages/index'
const HomePage = loadable(() => import('../pages/index'))
const AboutPage = loadable(() => import('../pages/about'))

function App () {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/about' component={AboutPage} />
    </Switch>
  )
}

export default App
