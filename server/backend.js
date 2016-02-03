'use strict'

var User = require('seneca-user')
var Auth = require('seneca-auth')
var AuthLocal = require('seneca-local-auth')
var AuthGoogle = require('seneca-google-auth')
var Concorda = require('./concorda')
var Lodash = require('lodash')

module.exports = function (server, options, next) {
  server.dependency('chairo')

  // Set up our seneca plugins
  var seneca = server.seneca

  seneca.use(User)
  seneca.use(Concorda)

  // Local auth should come built in and preconfigured
  seneca.use(Auth, {
    restrict: '/api',
    redirect:{
      login: {
        always: true,
        win:  '/',
        fail: '/login'
      }
    }
  })

  seneca.use(AuthGoogle, {
    provider: 'google',
    password: '',
    clientId: '',
    clientSecret: '',
    isSecure: false
  })

  // Should read from options too, should happen in Concorda
  var admin = {
    name: process.env.USER_NAME || 'Admin',
    email: process.env.USER_EMAIL || 'admin@concorda.com',
    password: process.env.USER_PASS || 'concorda'
  }

  // Dummy data, to be removed
  Lodash.each([
    {name: admin.name, email: admin.email, password: admin.password},
    {name: 'John Davids', email: 'john@vidi.com', password: 'pass'},
    {name: 'Jane Holten', email: 'jane@vidi.com', password: 'pass'},
    {name: 'Jenn Styles', email: 'jenn@concorda.com', password: 'pass'},
    {name: 'Mick Savage', email: 'mick@concorda.com', password: 'pass'}
  ], (user) => {
    seneca.act({role: 'user', cmd: 'register'}, user)
  })

  seneca.listen({
    pin: 'role:user, cmd:*',
    type: 'tcp',
    port: '3055'
  })

  next()
}

// Hapi uses this metadata.
module.exports.attributes = {
  name: 'concorda'
}
