const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const vueConfig = require('./vue-loader.config')
const HTMLPlugin = require('html-webpack-plugin');

const config = {
  entry: {
    isv: './isv/app.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueConfig
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          },
          {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[ext]?[hash]'
            }
          },
          {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader'],
          }
    ]
  },
  plugins: [
    new HTMLPlugin({
        template: '!!raw-loader!./isv/index.template.html',
        alwaysWriteToDisk: true,
        chunks: ['isv'],
    }), 
    new FriendlyErrorsPlugin()
  ]
}

module.exports = config