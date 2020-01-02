const express = require('express')
const path = require('path')
const webpack = require('webpack')
const opn = require('opn')
const proxyMiddleware = require('http-proxy-middleware')
var devMiddleware = require('webpack-dev-middleware')
var hotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.conf.dev.js')
const config = require('../config')

var app = express ()
var complier = webpack(webpackConfig)
devMiddleware =  devMiddleware(complier, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
  stats: {
    colors: true
  },
  // index: 'index.html',
  // headers: {"My-Custome-Header" : "xxx"},
  // mimeTypes: {"text/html": ["phtml"]}
  // watchOptions: {
  //  aggregateTimeout: 300,
  //  poll: true
  // }
})

hotMiddleware = hotMiddleware(complier, {
  path: '/__webpack_hmr',
  heartbeat: 2000,
  reload: true
})

complier.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

app.use(devMiddleware)
app.use(hotMiddleware)

var port = process.env.PORT || config.dev.port || 8080
var autoOpenBrowser = !!config.dev.autoOpenBrowser
var uri = 'http://localhost:' + port
var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})
devMiddleware.waitUntilValid(function () {
  _resolve()
})


readyPromise.then(() => {
  console.log(`server listen at ${port} ...`)
  if (autoOpenBrowser) {
    opn(uri)
  }
})

var server = app.listen(port)
console.log('start dev Server...')

