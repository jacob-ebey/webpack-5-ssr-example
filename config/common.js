/** @typedef {import('webpack').Configuration} Configuration */

/** @type {Configuration} */
const config = {
  mode: 'development',
  devtool: 'source-map',

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },

  optimization: {
    minimize: false
  },

  resolve: {
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
                  cacheDirectory: false
                }
              }
            ]
          }
        ]
      }
    ]
  }
}

module.exports = config
