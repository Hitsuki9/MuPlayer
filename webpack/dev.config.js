const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',

  entry: {
    'MuPlayer': path.resolve(__dirname, '../src/js/index.js')
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true
  },

  resolve: {
    alias: {
      '_js': path.resolve(__dirname, '../src/js'),
      '_template': path.resolve(__dirname, '../src/template'),
      '_css': path.resolve(__dirname, '../src/css'),
      '_svg': path.resolve(__dirname, '../src/assets/svg')
    },
    modules: ["node_modules"],
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.join(__dirname, 'postcss.config.js')
              }
            }
          },
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
    host: '0.0.0.0',
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
      VER: `"v${ require('../package.json').version }"`,
    })
  ]
}
