'use strict'

const Concorda = require('concorda')

const Config = require('../config/config.js')()

module.exports = function (server, options, next) {
  server.dependency('chairo')

  // Set up our seneca plugins
  var seneca = server.seneca

  seneca.use('options', Config)

  seneca.ready(function(){
    seneca
      .use(Concorda, seneca.options)
  })

  next()
}

// Hapi uses this metadata.
module.exports.attributes = {
  name: 'concorda-dashboard'
}
