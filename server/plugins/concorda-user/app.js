'use strict'

const ManageGroup = require('./group')
const ManageUser = require('./user')
const _ = require('lodash')

module.exports = function (opts) {
  var seneca = this

  var options = {
    name: 'concorda-user'
  }
  options = _.extend(options, opts || {})

  seneca.use(ManageGroup, options)
  seneca.use(ManageUser, options)

  return {
    name: options.name
  }
}
