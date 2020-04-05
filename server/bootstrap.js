import React from 'react'
import { StaticRouter } from 'react-router-dom'

import App from '../common/app'

function ServerBootstrap ({ location }) {
  return (
    <StaticRouter location={location}>
      <App />
    </StaticRouter>
  )
}

export default ServerBootstrap
