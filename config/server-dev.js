const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const base = require('./server-base')

/** @typedef {import('webpack').Configuration} Configuration */

/** @type {Configuration} */
const config = {
  output: {
    path: path.resolve(__dirname, '../dist/server-dev')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

const merged = merge.smart(base, config)
merged.entry = ['@babel/polyfill', path.resolve(__dirname, '../server/middleware/render-bootstrap.js')]

module.exports = merged
