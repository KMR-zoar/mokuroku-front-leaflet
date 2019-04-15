const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const Copy = require('copy-webpack-plugin')
const Clean = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const OutputDir = 'build'

module.exports = (env, argv) => {
  const IS_DEVELOPMENT = argv.mode === 'development'

  return {
    mode: 'development',
    devtool: IS_DEVELOPMENT ? 'source-map' : 'none',
    entry: ['@babel/polyfill', './src/index.js'],
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
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        { test: /.png$/, use: ['file-loader'] }
      ]
    },
    optimization: {
      minimize: IS_DEVELOPMENT ? false : true,
      minimizer: IS_DEVELOPMENT
        ? []
        : [
            new TerserPlugin({
              terserOptions: {
                parallel: true,
                compress: { drop_console: true },
                ecma: 8
              }
            }),
            new OptimizeCssAssetsPlugin({})
          ]
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'style.css' }),
      new Clean({ cleanOnceBeforeBuildPatterns: [OutputDir, '*'] }),
      new Copy([
        {
          from: 'assets',
          to: ''
        }
      ])
    ]
  }
}
