const merge = require('webpack-merge')

const base = require('./server-base')

/** @typedef {import('webpack').Configuration} Configuration */

/** @type {Configuration} */
const config = {
  mode: 'production',
  optimization: {
    minimize: true
  }
}

module.exports = merge.smart(base, config)
