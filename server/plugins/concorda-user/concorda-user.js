'use strict'

const ApplicationController = require('./connected-service')
const _ = require('lodash')

module.exports = function (opts) {
  var seneca = this

  var options = {
    name: 'concorda-user'
  }
  options = _.extend(options, opts || {})

  seneca.use(ApplicationController)

  return {
    name: options.name
  }
}
