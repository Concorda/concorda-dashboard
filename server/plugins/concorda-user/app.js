'use strict'

var ApplicationController = require('./controller/application')

module.exports = function () {
  var seneca = this

  seneca.use(ApplicationController)
  // Our options.

  return {
    name: 'concorda-user-main'
  }
}