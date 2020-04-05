import path from 'path'
import chalk from 'chalk'
import serveStatic from 'serve-static'

/** @typedef {import('express').Application} Application */

/**
 * @param {Application} app
 * @param {() => void} done
 */
async function initMiddleware (app, done) {
  app.use('/static', serveStatic(path.resolve(__dirname, '../client')))

  const bootstrap = (await import('./render-bootstrap')).default

  try {
    app.get('/*', bootstrap())
  } catch (e) {
    console.error(chalk.red(e))
    throw new Error('Cant find webpack client stats file')
  }

  done()
}

export default initMiddleware
