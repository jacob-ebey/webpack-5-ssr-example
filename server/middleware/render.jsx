import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { ChunkExtractor } from '@loadable/server'

import App from '../../common/app'

/** @typedef {import('express').Request} Request */
/** @typedef {import('express').Response} Response */

const statsFile = path.resolve('./dist/client/stats.json')

/**
 * @param {Request} req
 * @param {Response} res
 */
async function render (req, res) {
  try {
    const extractor = new ChunkExtractor({ statsFile })
    const jsx = extractor.collectChunks(<App />)

    const html = renderToString(jsx)

    const scriptTags = extractor.getScriptTags()
    const linkTags = extractor.getLinkTags()
    const styleTags = extractor.getStyleTags()

    return res.send(`<!doctype html>
    <html lang="en-us">
        <head>
          <script src="http://localhost:3002/static/container.js"></script>
            <link rel="shortcut icon" href="data:;base64,=">
            ${styleTags}
            ${linkTags}
        </head>
      
        <body>
          <div id="root">${html}</div>
          ${scriptTags}
        </body>
      </html>`)
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    res.send(e.toString())
  }
}

export default render
