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
        return response(err)
      }
      if (!users) {
        return response(null, {err: false, data: []})
      }

      for (var i in users) {
        users[i] = users[i].data$(false)
      }

      response(null, {err: false, data: users, count: users.length})
    })
  }

  function createUser (msg, response) {
    var userData = msg.data

    this.act('role: user, cmd: register', userData, function (err, result) {
      if (err) {
        return response(null, {err: true, msg: err})
      }
      if (!result.ok) {
        return response(null, {err: true, msg: result.why})
      }
      response(null, {err: false, data: result.user})
    })
  }

  function updateUser (msg, response) {
    var userData = msg.data

    this.act('role: user, cmd: update', userData, function (err, result) {
      if (err) {
        return response(null, {err: true, msg: err})
      }
      if (!result.ok) {
        return response(null, {err: true, msg: result.why})
      }
      response(null, {err: false, data: result.user})
    })
  }

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
    .add({role: options.name, cmd: 'listUsers'}, listUsers)
    .add({role: options.name, cmd: 'createUser'}, createUser)
    .add({role: options.name, cmd: 'updateUser'}, updateUser)

  seneca.act({
    role: 'web', use: {
      name: options.name,
      prefix: '/api',
      pin: {role: options.name, cmd: '*'},
      map: {
        closeSession: {POST: true, alias: 'user/{user_id}/session/close'},
        listUsers: {GET: true, alias: 'user'},
        createUser: {POST: true, data: true, alias: 'user'},
        updateUser: {PUT: true, data: true, alias: 'user'}
      }
    }
  })

  return {
    name: options.name
  }
}
