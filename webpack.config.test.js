const webpack = require('webpack')

const OutputDir = 'build'

module.exports = {
  target: 'node',
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: `${__dirname}/${OutputDir}`,
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  optimization: {
    minimize: false
  }
}
