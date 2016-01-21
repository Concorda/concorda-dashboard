'use strict'

var Async = require('async')

module.exports = function (opts) {
  var seneca = this

  var options = {
    name: 'default_data'
  }
  options = seneca.util.deepextend(options, opts || {})

  seneca.add('init: ' + options.name, addDefaultData)

  var users = [
    {
      name: process.env.USER_NAME || 'Admin',
      email: process.env.USER_EMAIL || 'admin@concorda.com',
      password: process.env.USER_PASS || 'concorda'
    },
    {
      name: 'First User',
      email: 'user1@concorda.com',
      password: 'concorda'
    },
    {
      name: 'Second User',
      email: 'user2@concorda.com',
      password: 'concorda'
    },
    {
      name: 'Third User',
      email: 'user3@concorda.com',
      password: 'concorda'
    },
    {
      name: 'Another User',
      email: 'some_user@concorda.com',
      password: 'concorda'
    }

  ]

  function addDefaultData (msg, done) {
    Async.each(users, createUser, function () {
      done()
    })

    function createUser (user, done) {
      // add default user
      seneca.act('role: user, cmd: register', user, done)
    }
  }

  return {
    name: options.name
  }
}
