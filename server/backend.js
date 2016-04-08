'use strict'

const ConcordaRest = require('concorda-rest')
const ConcordaProxy = require('./proxy.js')
const LoadConfig = require('../config/config.js')

module.exports = function (server, options, next) {
  server.dependency('chairo')

  const Config = LoadConfig()
  // Set up our seneca plugins
  const seneca = server.seneca

  seneca.log.info('Using configuration', JSON.stringify(Config))

  seneca.ready(function(){
    if (!Config.concorda || Config.concorda.external_api === false || Config.concorda.external_api === 'false') {
      seneca.log.info('Using internal REST API')
      seneca
        .use(ConcordaRest, Config)
    }
    else {
      seneca.log.info('Using external REST API')
      ConcordaProxy(server)
    }
  })

  next()
}

// Hapi uses this metadata.
module.exports.attributes = {
  name: 'concorda-dashboard'
}
