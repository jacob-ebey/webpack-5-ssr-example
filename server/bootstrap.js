import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import App from '../common/app'

function ServerBootstrap ({ helmetContext, location }) {
  return (
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={location}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  )
}

export default ServerBootstrap
