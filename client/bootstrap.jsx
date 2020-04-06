import React from 'react'
import ReactDOM from 'react-dom'
import { loadableReady } from '@loadable/component'
import { BrowserRouter } from 'react-router-dom'

import App from '../common/app'

function ClientBootstrap () {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
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
