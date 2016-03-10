'use strict'

const ConcordaRest = require('concorda-rest')

const Config = require('../config/config.js')()

module.exports = function (server, options, next) {
  server.dependency('chairo')

  // Set up our seneca plugins
  var seneca = server.seneca

  seneca.use('options', Config)

  seneca.ready(function(){
    seneca
      .use(ConcordaRest, Config)
  })

  next()
}

// Hapi uses this metadata.
module.exports.attributes = {
  name: 'concorda-dashboard'
}
