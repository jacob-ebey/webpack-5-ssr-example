import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ApolloProvider } from '@apollo/react-hooks'
import { renderToStringWithData } from '@apollo/react-ssr'
import { discoverProjectStyles, getUsedStyles } from 'used-styles'

import App from '../common/app'
import createApolloClient from '../common/apollo-client'

/** @typedef {import('express').Request} Request */

const stylesLookup = discoverProjectStyles('./dist/client')

function ServerBootstrap ({ apolloClient, helmetContext, location }) {
  return (
    <HelmetProvider context={helmetContext}>
      <ApolloProvider client={apolloClient}>
        <StaticRouter location={location}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    </HelmetProvider>
  )
}

/**
 * @param {Request} req
 */
function getInitialProps (req) {
  return {
    apolloClient: createApolloClient(),
    helmetContext: {},
    location: req.path
  }
}

async function toHtmlString ({
  initialProps,
  jsx,
  linkTags,
  scriptTags,
  styleTags
}) {
  renderToString(jsx)
  const html = await renderToStringWithData(jsx)

  // TODO: Figure out why ChunkExtractor isn't picking up css assets
  const usedStyles = getUsedStyles(html, stylesLookup)
  usedStyles.forEach(style => {
    linkTags += `\n<link rel="prefetch" as="style" href="http://localhost:3001/static/${style}">`
    styleTags += `\n<link rel="stylesheet" type="text/css" href="http://localhost:3001/static/${style}">`
  })

  const {
    apolloClient,
    helmetContext: { helmet }
  } = initialProps

  return `<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
<head>
  ${linkTags}
  ${helmet.title.toString()}
  ${helmet.meta.toString()}
  ${helmet.link.toString()}
  <!-- <script src="http://localhost:3002/static/container.js"></script> -->
  <link rel="shortcut icon" href="data:;base64,=">
  ${styleTags}
</head>
<body ${helmet.bodyAttributes.toString()}>
  <div id="root">${html}</div>
  ${scriptTags}
  <script>window.__APOLLO_STATE__ = ${JSON.stringify(apolloClient.extract())}</script>
</body>
</html>`
}

ServerBootstrap.getInitialProps = getInitialProps
ServerBootstrap.toHtmlString = toHtmlString

export default ServerBootstrap
