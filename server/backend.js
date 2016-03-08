'use strict'

const Concorda = require('concorda')

module.exports = function (server, options, next) {
  server.dependency('chairo')

  var Config = require('../config/config.js')()

  // Set up our seneca plugins
  var seneca = server.seneca

  seneca.ready(function () {
    seneca
      .use(Concorda, {
        local: process.env.LOCAL || true,
        'google-auth': Config.googleLogin,
        'twitter-auth': Config.twitterLogin,
        'github-auth': Config.githubLogin,
        'mail': Config.mail
      })
  })

  next()
}

// Hapi uses this metadata.
module.exports.attributes = {
  name: 'concorda-dashboard'
}
