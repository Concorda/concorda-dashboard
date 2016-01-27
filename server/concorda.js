'use strict'

const _ = require('lodash')
const Async = require('async')

module.exports = function (opts) {
  var seneca = this

  var options = {
    name: 'concorda'
  }
  options = _.extend(options, opts || {})

  function listUsers (msg, response) {
    this.make$('sys', 'user').list$({}, function (err, users) {
      if (err) {
        return response(null, {ok: false, why: err})
      }
      users = users || []

      for (var i in users) {
        users[i] = users[i].data$(false)
      }

      response(null, {ok: true, data: users, count: users.length})
    })
  }

  function createUser (msg, response) {
    var userData = msg.data

    this.act('role: user, cmd: register', userData, function (err, result) {
      if (err) {
        return response(null, {ok: false, why: err})
      }
      if (!result.ok) {
        return response(null, {ok: false, why: result.why})
      }
      response(null, {ok: true, data: result.user})
    })
  }

  function updateUser (msg, response) {
    var userData = msg.data

    this.act('role: user, cmd: update', userData, function (err, result) {
      if (err) {
        return response(null, {ok: false, why: err})
      }
      if (!result.ok) {
        return response(null, {ok: false, why: result.why})
      }
      response(null, {ok: true, data: result.user})
    })
  }

  function deleteUser (msg, response) {
    var userId = msg.req$.params.userId

    this.make$('sys', 'user').load$({id: userId}, function (err, user) {
      if (err) {
        return response({ok: false, why: err})
      }
      if (!user || !user.nick) {
        return response(null, {ok: false, why: 'User not found'})
      }

      this.act('role: user, cmd: delete', {nick: user.nick}, function (err, result) {
        if (err) {
          return response(null, {ok: false, why: err})
        }
        if (!result.ok) {
          return response(null, {ok: false, why: result.why})
        }
        response(null, {ok: true})
      })
    })
  }

  function closeUserSessions (msg, response) {
    var user_id = msg.req$.params.user_id

    if (!user_id) {
      return response('Invalid user selected')
    }

    this.make$('sys', 'login').list$({user: user_id, active: true}, function (err, logins) {
      if (err) {
        return response(null, {ok: false, why: err})
      }
      if (!logins) {
        return response(null, {ok: true, sessions: 0})
      }

      Async.each(logins, closeSession, function (err) {
        if (err) {
          return response(null, {ok: false, why: err})
        }

        response(null, {ok: true, sessions: logins.length})
      })
    })
  }

  function closeSession (session, done) {
    seneca.log.debug('closing session', session)
    session.remove$(done)
  }

  seneca
    .add({role: options.name, cmd: 'closeSession'}, closeUserSessions)
    .add({role: options.name, cmd: 'listUsers'}, listUsers)
    .add({role: options.name, cmd: 'createUser'}, createUser)
    .add({role: options.name, cmd: 'updateUser'}, updateUser)
    .add({role: options.name, cmd: 'deleteUser'}, deleteUser)

  seneca.act({
    role: 'web', use: {
      name: options.name,
      prefix: '/api',
      pin: {role: options.name, cmd: '*'},
      map: {
        closeSession: {POST: true, alias: 'user/{user_id}/session/close'},
        listUsers: {GET: true, alias: 'user'},
        createUser: {POST: true, data: true, alias: 'user'},
        updateUser: {PUT: true, data: true, alias: 'user'},
        deleteUser: {DELETE: true, alias: 'user/{userId}'}
      }
    }
  })

  return {
    name: options.name
  }
}
