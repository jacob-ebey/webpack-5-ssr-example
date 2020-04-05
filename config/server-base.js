const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const common = require('./common')

/** @typedef {import('webpack').Configuration} Configuration */

/** @type {Configuration} */
const config = {
  name: 'server',
  entry: ['@babel/polyfill', path.resolve(__dirname, '../server/index.js')],
  externals: ['@loadable/component', nodeExternals()],
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'webpack5SsrExample',
      library: { type: 'commonjs2' },
      filename: 'container.js',
      shared: ['react', 'react-dom']
    })
  ]
}

module.exports = merge.smart(common('node'), config)
