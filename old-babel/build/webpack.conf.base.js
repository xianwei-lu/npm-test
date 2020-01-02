const path = require('path')
var utils = require('./utils')
var config = require('../config')
function resolve(dir) {
  return path.join(__dirname, '../', dir)
}
module.exports = {
  entry: {
    app: [resolve('src/main.js')]
  },
  resolve: {
    alias: {
      'assets': resolve('src/assets'),
      '@': resolve('src')
    }
  },
  output: {
    filename: '[name].js',
    path: config.build.assetsRoot,
    publicPath: '/',
    devtoolModuleFilenameTemplate: (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'))
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        include: [resolve('src')],
        options: {
          sourceMap: true,
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('font/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
