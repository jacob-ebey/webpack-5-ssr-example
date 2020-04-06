import path from 'path'
import chalk from 'chalk'
import serveStatic from 'serve-static'

/** @typedef {import('express').Application} Application */

/**
 * @param {Application} app
 */
async function initRender (app) {
  const bootstrap = (await import('./render-bootstrap')).default

  try {
    app.get('/*', bootstrap())
  } catch (e) {
    console.error(chalk.red(e))
    throw new Error('Cant find webpack client stats file')
  }
}

/**
 * @param {Application} app
 * @param {() => void} done
 */
async function initMiddleware (app, done = undefined) {
  if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const config = require(path.resolve(__dirname, '../../config/client-dev.js'))

    const compiler = webpack(config)
    const devMiddleware = webpackDevMiddleware(compiler, {
      writeToDisk (filePath) {
        return /stats\.json/.test(filePath)
      }
    })

    app.use('/static', devMiddleware)

    app.use(webpackHotMiddleware(compiler))

    // await new Promise(resolve => devMiddleware.waitUntilValid(resolve))
  } else {
    app.use('/static', serveStatic(path.resolve(__dirname, '../client')))
  }

  await initRender(app)

  done && done()
}

export default initMiddleware
