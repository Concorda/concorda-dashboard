'use strict'

const _ = require('lodash')
const Async = require('async')

module.exports = function (opts) {
  var seneca = this

  var options = {
    name: 'manage-user'
  }
  options = _.extend(options, opts || {})

  function closeUserSessions (msg, response) {
    var user_id = msg.req$.params.user_id

    if (!user_id) {
      return response('Invalid user selected')
    }

    this.make$('sys', 'login').list$({user: user_id, active: true}, function (err, logins) {
      if (err) {
        return response(err)
      }
      if (!logins) {
        return response(null, {err: false, sessions: 0})
      }

      Async.each(logins, closeSession, function (err) {
        if (err) {
          return response(err)
        }

        response(null, {err: false, sessions: logins.length})
      })
    })
  }

  function closeSession (session, done) {
    seneca.log.debug('closing session', session)
    session.remove$(done)
  }

  seneca
    .add({role: options.name, cmd: 'closeSession'}, closeUserSessions)

  seneca.act({
    role: 'web', use: {
      name: options.name,
      prefix: '/api',
      pin: {role: options.name, cmd: '*'},
      map: {
        closeSession: {POST: true, alias: 'user/{user_id}/session/close'}
      }
    }
  })

  return {
    name: options.name
  }
}
