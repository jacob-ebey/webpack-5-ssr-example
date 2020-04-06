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
    const webpackHotServerMiddleware = require('webpack-hot-server-middleware')

    const clientConfig = require(path.resolve(__dirname, '../../config/client-dev.js'))
    const serverConfig = require(path.resolve(__dirname, '../../config/server-dev.js'))

    const compiler = webpack([clientConfig, serverConfig])
    console.log(compiler.compilers[0].name)
    console.log(compiler.compilers[1].name)
    const devMiddleware = webpackDevMiddleware(compiler, {
      serverSideRender: true,
      writeToDisk (filePath) {
        return /server-dev/.test(filePath) || /stats\.json/.test(filePath)
      }
    })

    app.use(devMiddleware)
    app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')))

    const hotMiddleware = webpackHotServerMiddleware(compiler)
    app.use('/', hotMiddleware)

    // await new Promise(resolve => devMiddleware.waitUntilValid(resolve))
  } else {
    app.use('/static', serveStatic(path.resolve(__dirname, '../client')))
    await initRender(app)
  }

  done && done()
}

export default initMiddleware
