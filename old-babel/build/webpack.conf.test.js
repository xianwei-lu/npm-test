var merge = require('webpack-merge')
var webpack = require('webpack')
var utils = require('./utils')
var webpackBaseConfig = require('./webpack.conf.base')

var webpackConfig = merge(webpackBaseConfig, {
  module: {
    rules: utils.styleLoaders()
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"test"'}
    })
  ]
})

delete webpackConfig.entry

module.exports = webpackConfig
