import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import App from '../common/app'

/** @typedef {import('express').Request} Request */

function ServerBootstrap ({ helmetContext, location }) {
  return (
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={location}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  )
}

/**
 * @param {Request} req
 */
function getInitialProps (req) {
  return {
    helmetContext: {},
    location: req.path
  }
}

function toHtmlString ({
  initialProps,
  jsx,
  linkTags,
  scriptTags,
  styleTags
}) {
  const html = renderToString(jsx)

  const { helmet } = initialProps.helmetContext

  return `<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
<head>
  ${helmet.title.toString()}
  ${helmet.meta.toString()}
  ${helmet.link.toString()}
  <!-- <script src="http://localhost:3002/static/container.js"></script> -->
  <link rel="shortcut icon" href="data:;base64,=">
  ${styleTags}
  ${linkTags}
</head>
<body ${helmet.bodyAttributes.toString()}>
  <div id="root">${html}</div>
  ${scriptTags}
</body>
</html>`
}

ServerBootstrap.getInitialProps = getInitialProps
ServerBootstrap.toHtmlString = toHtmlString

export default ServerBootstrap
