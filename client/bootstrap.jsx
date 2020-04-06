import React from 'react'
import ReactDOM from 'react-dom'
import { loadableReady } from '@loadable/component'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ApolloProvider } from '@apollo/react-hooks'

import App from '../common/app'
import createApolloClient from '../common/apollo-client'

function ClientBootstrap () {
  return (
    <HelmetProvider>
      <ApolloProvider client={createApolloClient()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </HelmetProvider>
  )
}

function render () {
  const renderFunc = module.hot ? ReactDOM.render : ReactDOM.hydrate

  renderFunc(<ClientBootstrap />, document.getElementById('root'))
}

if (module.hot) {
  render()
  module.hot.accept()
} else {
  loadableReady(render)
}
