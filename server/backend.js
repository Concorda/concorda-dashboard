'use strict'

var User = require('seneca-user')
var Auth = require('seneca-auth')
var AuthGoogle = require('seneca-google-auth')
var Concorda = require('./concorda')
var Lodash = require('lodash')
var SenecaMail = require('seneca-mail')
var Path = require('path');
var EmailPlugin = require('./util/email')


module.exports = function (server, options, next) {
  server.dependency('chairo')

  // Set up our seneca plugins
  var seneca = server.seneca

  seneca.use(User)

  seneca.use(Auth, {
    restrict: '/api',
    redirect: {
      login: {
        always: true,
        win: '/',
        fail: '/login'
      }
    }
  })

  seneca.use(Concorda)

  seneca.ready(function () {
    seneca.use(AuthGoogle, {
      provider: 'google',
      password: '',
      clientId: '',
      clientSecret: '',
      isSecure: false
    })

    seneca.use(EmailPlugin, options)

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

    var templateFolder = Path.join(Path.resolve(__dirname), 'email-templates')

    seneca.use(SenecaMail, {
      folder: templateFolder,
      mail: {
        from: 'contact@concorda.com'
      },
      config: {
        host: "127.0.0.1",
        port: 25,
        ignoreTLS: true
      }
    })


    function createReset (msg, response) {
      var email = msg.data.email
      seneca.log.debug('create reset token for', email)
      if (!email) {
        return response(null, {ok: false, why: 'No valid email'})
      }

      this.make$('sys', 'user').load$({email: email}, function (err, user) {
        if (err) {
          return response(null, {ok: false, why: err})
        }
        if (!user) {
          return response(null, {ok: false, why: 'No user found'})
        }

        seneca.act('role:user, cmd:create_reset', {email: email}, function (err, data) {
          if (err) {
            return response(null, {ok: false, why: err})
          }
          if (!data) {
            return response(null, {ok: false, why: 'Internal error'})
          }
          var token = data.reset.id

          // @hack until we will have proper settings
          var url = `http://localhost:3050/password_reset/${token}`
          seneca.act('role: email, cmd: send_email',
            {
              to: email,
              data: {url: url},
              template: 'resetPassword',
              subject: 'Reset password required'
            }, function (err) {
              if (err) {
                return response(null, {ok: false, why: err})
              }
              response(null, {ok: true})
            })
        })
      })
    }

    seneca
      .add({role: 'auth', cmd: 'create_reset'}, createReset)

    next()
  })
}

// Hapi uses this metadata.
module.exports.attributes = {
  name: 'concorda'
}
