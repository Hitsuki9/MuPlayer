const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../config')

module.exports = {
  mode: config.dev.mode,

  entry: {
    'MuPlayer': path.resolve(__dirname, '../src/js/index.js')
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },

  resolve: {
    alias: {
      '@js': path.resolve(__dirname, '../src/js'),
      '@template': path.resolve(__dirname, '../src/template'),
      '@css': path.resolve(__dirname, '../src/css'),
      '@svg': path.resolve(__dirname, '../src/assets/svg')
    },
    modules: ['node_modules']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: path.resolve(__dirname, '../src/js'),
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }, {
        test: /\.art$/,
        loader: 'art-template-loader'
      }, {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },

  devServer: {
    host: config.dev.host,
    port: config.dev.port,
    compress: true,
    contentBase: path.resolve(__dirname, '../src'),
    open: true,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/
    },
    watchContentBase: true,
    quiet: true
  },

  plugins: [
    new webpack.DefinePlugin({
      VER: JSON.stringify(`v${ require('../package.json').version }`),
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}
