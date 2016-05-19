'use strict'

const ConcordaServer = require('concorda-server')
const LoadConfig = require('../config/config.js')

module.exports = function (server, options, next) {
  server.dependency('chairo')

  const Config = LoadConfig()
  // Set up our seneca plugins
  const seneca = server.seneca

  seneca.log.info('Using configuration', JSON.stringify(Config))

  seneca.ready(function(){
    seneca
      .use(ConcordaServer, Config)
  })

  next()
}

// Hapi uses this metadata.
module.exports.attributes = {
  name: 'concorda-dashboard'
}
