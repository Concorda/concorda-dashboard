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

  function deleteUser (msg, response) {
    var userId = msg.req$.params.userId

    this.make$('sys', 'user').load$({id: userId}, function (err, user) {
      if (err) {
        return response(err)
      }
      if (!user || !user.nick) {
        return response(null, {err: true, msg: 'No user found'})
      }

      this.act('role: user, cmd: delete', {nick: user.nick}, function (err, result) {
        if (err) {
          return response(null, {err: true, msg: err})
        }
        if (!result.ok) {
          return response(null, {err: true, msg: result.why})
        }
        response(null, {err: false})
      })
    })
  }

  function closeUserSessions (msg, response) {
    let user_id = msg.req$.params.user_id
    let that = this

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

        // now I should notify all other apps to logout that user
        that.act('role: concorda, info: logout', {user_id: user_id})
        response(null, {err: false, sessions: logins.length})
      })
    })
  }

  function closeSession (session, done) {
    seneca.log.debug('closing session', session)
    session.remove$(done)
  }

  seneca
    .use('mesh',{auto:true, pin:'role:user'})

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
