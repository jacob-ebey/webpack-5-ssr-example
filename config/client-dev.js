const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const base = require('./client-base')

/** @typedef {import('webpack').Configuration} Configuration */

/** @type {Configuration} */
const config = {
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

const merged = merge.smart(base, config)
merged.entry = ['@babel/polyfill', 'webpack-hot-middleware/client', path.resolve(__dirname, '../client/index.js')]

module.exports = merged
