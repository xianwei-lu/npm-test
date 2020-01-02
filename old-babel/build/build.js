process.env.NODE_ENV = 'production'
var fs = require('fs')
var path = require('path')
var ora = require('ora')
var colors = require('colors')
var webpack = require('webpack')
var config = require('../config')
var rm = require('./rmdir')
var webpackConfig = require('./webpack.conf.prod')

var spinner = ora('building for production...')

var staticPath = path.join(config.build.assetsRoot, config.build.assetsSubDir)

spinner.start()

function toBuild () {
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    console.log(' Build complete.\n'.cyan)
  })
}

if (fs.existsSync(staticPath)) {
  rm(staticPath, err => {
    if (err) throw err
    toBuild()
  })
} else {
  toBuild()
}

