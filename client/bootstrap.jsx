import React from 'react'
import ReactDOM from 'react-dom'
import { loadableReady } from '@loadable/component'

import App from '../common/app'

loadableReady(() => {
  ReactDOM.hydrate(
    <App />,
    document.getElementById('root')
  )
})
