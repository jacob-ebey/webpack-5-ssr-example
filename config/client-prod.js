const merge = require('webpack-merge')

const base = require('./client-base')

/** @typedef {import('webpack').Configuration} Configuration */

/** @type {Configuration} */
const config = {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  optimization: {
    minimize: true
  }
}

module.exports = merge.smart(base, config)
