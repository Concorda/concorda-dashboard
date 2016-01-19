'use strict'

const Mongo = require('mongo-store')

module.exports = function () {
  var seneca = this

  // Our options.
  const options = seneca.options()
  seneca.use(Mongo, options.db)

  return {
    name: 'mongo-db'
  }
}