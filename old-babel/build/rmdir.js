const fs = require('fs')
const path = require('path')
const config = require('../config')

function rm (path, callback) {
  var stat = fs.statSync(path)
  if (stat.isDirectory()) {
    var files = fs.readdirSync(path) || []
    files.forEach(file => {
      rm(path + '/' + file)
    })
    try {
      fs.rmdirSync(path)
    } catch (e) {
      callback && callback(e)
      throw e
    }
    callback && callback(null)
  } else {
    // fs.unlink(path, err => {
    //   if (err) throw err
    //   callback && callback(null)
    // })
    try {
      fs.unlinkSync(path)
    } catch (err) {
      callback && callback(err)
      throw err
    }
    callback && callback(null)
  }
}

module.exports = rm
