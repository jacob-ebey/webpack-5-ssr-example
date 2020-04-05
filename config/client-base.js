const path = require('path')
const LoadablePlugin = require('@loadable/webpack-plugin')
const merge = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const common = require('./common')

/** @typedef {import('webpack').Configuration} Configuration */

/** @type {Configuration} */
const config = {
  name: 'client',
  entry: ['@babel/polyfill', path.resolve(__dirname, '../client/index.js')],
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    publicPath: 'http://localhost:3001/static/'
  },
  plugins: [
    new LoadablePlugin({ filename: 'stats.json', writeToDisk: true }),
    new ModuleFederationPlugin({
      name: 'webpack5SsrExample',
      library: { type: 'var', name: 'webpack5SsrExample' },
      filename: 'container.js',
      shared: ['react', 'react-dom']
    })
  ]
}

module.exports = merge.smart(common('web'), config)
