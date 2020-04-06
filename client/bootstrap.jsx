import React from 'react'
import ReactDOM from 'react-dom'
import { loadableReady } from '@loadable/component'
import { BrowserRouter } from 'react-router-dom'

import App from '../common/app'

function render () {
  if (module.hot) {
    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      document.getElementById('root')
    )
  } else {
    ReactDOM.hydrate(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      document.getElementById('root')
    )
  }
}

if (module.hot) {
  render()
  module.hot.accept()
} else {
  loadableReady(render)
}
