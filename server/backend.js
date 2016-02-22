'use strict'

const Concorda = require('concorda')

module.exports = function (server, options, next) {
  server.dependency('chairo')

  var Config = require('../config/config.js')()

  // Set up our seneca plugins
  var seneca = server.seneca

  // this should be changed after decree will support configuration
  // and also decree will be integrated in concorda-dashboard
  seneca
    .use('mesh', {auto: true})
    .use(Concorda, {
      local: true,
      'google-auth': Config.googleLogin,
      'twitter-auth': Config.twitterLogin,
      'github-auth': Config.githubLogin,
      'mail': Config.mail
    })

  next()
}

// Hapi uses this metadata.
module.exports.attributes = {
  name: 'concorda-dashboard'
}
