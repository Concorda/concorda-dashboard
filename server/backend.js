'use strict'

var User = require('seneca-user')
var Auth = require('seneca-auth')
var AuthGoogle = require('seneca-google-auth')
var AuthTwitter = require('seneca-twitter-auth')
var AuthGithub = require('seneca-github-auth')
var Concorda = require('./concorda')
var Lodash = require('lodash')
var SenecaMail = require('seneca-mail')

var EmailPlugin = require('./util/email')

var Config = require('../config/config.js')()

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
  seneca.use(EmailPlugin, options)

  seneca.ready(function () {
    loadGoogleAuth()

    seneca.add('role: auth, cmd: loginGoogle', function (args, done) {
      var callback_url = Lodash.get(args, 'req$.auth.credentials.query.callback_url')

      this.prior(args, function (err, data) {
        if (callback_url) {
          data.http$ = data.http$ || {}
          data.http$.redirect = callback_url
        }
        done(err, data)
      })
    })


    // Should read from options too, should happen in Concorda
    var admin = Config.adminData

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

    seneca.use(SenecaMail, Config.mailtrap)

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
              data: {
                email: email,
                url: url
              },
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

  function loadGoogleAuth () {
    seneca.use(AuthGoogle, Config.googleLogin)

    seneca.use(AuthTwitter, Config.twitterLogin)

    seneca.use(AuthGithub, Config.githubLogin)

    seneca.ready(function () {
      // this is for other apps using Twitter login via redirect
      seneca.add('role: auth, cmd: loginTwitter', function (args, done) {
        seneca.log.debug('Twitter login')

        var callback_url = Lodash.get(args, 'req$.auth.credentials.query.callback_url')
        seneca.log.debug('Callback: ', callback_url)
        this.prior(args, function (err, data) {
          if (callback_url) {
            data.http$ = data.http$ || {}
            data.http$.redirect = callback_url
          }
          done(err, data)
        })
      })

      // this is for other apps using Github login via redirect
      seneca.add('role: auth, cmd: loginGithub', function (args, done) {
        seneca.log.debug('Github login')

        var callback_url = Lodash.get(args, 'req$.auth.credentials.query.callback_url')
        seneca.log.debug('Callback: ', callback_url)
        this.prior(args, function (err, data) {
          if (callback_url) {
            data.http$ = data.http$ || {}
            data.http$.redirect = callback_url
          }
          done(err, data)
        })
      })

      // this is for other apps using Google login via redirect
      seneca.add('role: auth, cmd: loginGoogle', function (args, done) {
        seneca.log.debug('Google login')

        var callback_url = Lodash.get(args, 'req$.auth.credentials.query.callback_url')
        seneca.log.debug('Callback: ', callback_url)
        this.prior(args, function (err, data) {
          if (callback_url) {
            data.http$ = data.http$ || {}
            data.http$.redirect = callback_url
          }
          done(err, data)
        })
      })
    })
  }
}

// Hapi uses this metadata.
module.exports.attributes = {
  name: 'concorda'
}
