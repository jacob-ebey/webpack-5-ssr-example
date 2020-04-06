import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { ChunkExtractor } from '@loadable/server'

import Bootstrap from '../bootstrap'

/** @typedef {import('express').Request} Request */
/** @typedef {import('express').Response} Response */

const statsFile = path.resolve('./dist/client/stats.json')

/**
 * @param {Request} req
 * @param {Response} res
 */
async function render (req, res) {
  try {
    /** @type {{ helmet: HelmetData }} */
    const helmetContext = {}

    const extractor = new ChunkExtractor({ statsFile })
    const jsx = extractor.collectChunks(
      <Bootstrap
        helmetContext={helmetContext}
        location={req.path}
      />
    )

    const html = renderToString(jsx)

    const scriptTags = extractor.getScriptTags()
    const linkTags = extractor.getLinkTags()
    const styleTags = extractor.getStyleTags()

    const { helmet } = helmetContext

    return res.send(
`<!doctype html>
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
    )
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    res.send('Internal server error')
  }
}

export default render
