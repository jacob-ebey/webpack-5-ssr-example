import path from 'path'

import React from 'react'
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
    const initialProps = await Promise.resolve(Bootstrap.getInitialProps(req))

    const extractor = new ChunkExtractor({ statsFile })
    const jsx = extractor.collectChunks(
      <Bootstrap {...initialProps} />
    )

    const scriptTags = extractor.getScriptTags()
    const linkTags = extractor.getLinkTags()
    const styleTags = extractor.getStyleTags()

    const html = await Promise.resolve(
      Bootstrap.toHtmlString({
        jsx,
        initialProps,
        linkTags,
        scriptTags,
        styleTags
      })
    )

    return res.send(html)
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    res.send('Internal server error')
  }
}

export default render
