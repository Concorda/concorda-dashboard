'use strict'

module.exports = function (opts) {
  var seneca = this

  var options = {
    name: 'default_data'
  }
  options = seneca.util.deepextend(options, opts || {})

  seneca.add('init: ' + options.name, addDefaultData)

  function addDefaultData (msg, done) {
    // add default user
    seneca.act({
      role: 'user',
      cmd: 'register',
      name: process.env.USER_NAME || 'Admin',
      email: process.env.USER_EMAIL || 'admin@concorda.com',
      password: process.env.USER_PASS || 'concorda'
    }, function (err, user) {
      if (err) {
        seneca.log.debug('Cannot register default user', err)
      }
      else {
        seneca.log.debug('Default user registered', user)
      }
      done()
    })
  }

  return {
    name: options.name
  }
}
