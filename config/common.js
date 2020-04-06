/** @typedef {import('webpack').Configuration} Configuration */

/** @type {Configuration} */
const config = target => ({
  mode: 'development',
  devtool: 'source-map',
  target,

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },

  optimization: {
    minimize: false
  },

  resolve: {
    alias: {
      fs: false,
      path: false
    },
    extensions: ['.js', '.jsx', '.mjs']
  },

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto'
          },
          {
            test: /\.(js|jsx|mjs)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  caller: target,
                  cacheDirectory: false
                }
              }
            ]
          }
        ]
      }
    ]
  }
})

module.exports = config
