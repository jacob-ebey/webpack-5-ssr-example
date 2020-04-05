import chalk from 'chalk'
import express from 'express'

import initMiddleware from './middleware'

const port = 3001

const app = express()

initMiddleware(app, () => {
  app.listen(port, () => {
    console.info(
      `[${new Date().toISOString()}]`,
      chalk.blue(`App is running: 🌎 http://localhost:${port}`)
    )
  })
})
