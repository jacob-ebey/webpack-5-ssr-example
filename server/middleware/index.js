/** @typedef {import('express').Application} Application */

import chalk from 'chalk'

/**
 * @param {Application} app
 * @param {() => void} done
 */
async function initMiddleware (app, done) {
  const bootstrap = (await import('./bootstrap')).default

  try {
    app.get('/*', bootstrap())
  } catch (e) {
    console.error(chalk.red(e))
    throw new Error('Cant find webpack client stats file')
  }

  done()
}

export default initMiddleware
