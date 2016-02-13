'use strict'

const _ = require('lodash')
const Async = require('async')
var Jsonic = require('jsonic')

module.exports = function (opts) {
  var seneca = this

  var options = {
    name: 'concorda'
  }
  options = _.extend(options, opts || {})

  function listUsers (msg, response) {
    // @ToDo - change msg.req$.query.* to msg.* after seneca-web is published with latest version
    var limit = msg.req$.query.limit
    var skip = msg.req$.query.skip
    var orderBy = msg.req$.query.order

    var q = {}

    if (limit) {
      q['limit$'] = limit
    }
    if (skip) {
      q['skip$'] = skip
    }

    if (orderBy) {
      if (_.isObject(orderBy)) {
        q['sort$'] = orderBy
      }
      else {
        try {
          orderBy = orderBy.replace(/%22/g, '\"').replace(/%20/g, ' ')
          q['sort$'] = Jsonic(orderBy)
        }
        catch (e) {
        }
      }
    }

    this.make$('sys', 'user').list$(q, function (err, users) {
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

  function loadUser (msg, response) {
    var userId = msg.userId

    this.make$('sys', 'user').load$({id: userId}, function (err, user) {
      if (err) {
        return response(null, {ok: false, why: err})
      }
      user = user || {}

      user = user.data$(false)

      response(null, {ok: true, data: user})
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
    let user_id = msg.req$.params.user_id
    let that = this

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

        // now I should notify all other apps to logout that user
        that.act('role: concorda, info: logout', {user_id: user_id})
        response(null, {ok: true, sessions: logins.length})
      })
    })
  }

  function closeSession (session, done) {
    seneca.log.debug('closing session', session)
    session.remove$(done)
  }

  function inviteUser (msg, response) {
    var email = msg.email
    var message = msg.message

    //var user = msg.req$.user.user
    //var invitedBy =
    //  user.firstName ? user.firstName : '' + ' ' +
    //  user.lastName ? user.lastName : ''

    // @hack until we will have proper settings
    var url = `http://localhost:3050/register`
    seneca.act('role: email, cmd: send_email',
      {
        to: email,
        data: {
          //invitedBy: invitedBy,
          email: email,
          message: message,
          url: url
        },
        template: 'inviteUser',
        subject: 'You have been invited to join Concorda'
      }, function (err) {
        if (err) {
          return response(null, {ok: false, why: err})
        }
        response(null, {ok: true})
      })
  }

  seneca
    .use('mesh', {auto: true, pin: 'role: user'})

  seneca
    .add({role: options.name, cmd: 'closeSession'}, closeUserSessions)
    .add({role: options.name, cmd: 'listUsers'}, listUsers)
    .add({role: options.name, cmd: 'loadUser'}, loadUser)
    .add({role: options.name, cmd: 'createUser'}, createUser)
    .add({role: options.name, cmd: 'updateUser'}, updateUser)
    .add({role: options.name, cmd: 'deleteUser'}, deleteUser)
    .add({
      role: options.name, cmd: 'inviteUser',
      email: {
        string$: true, required$: true,
        message: {string$: true}
      }
    }, inviteUser)


  function init (args, done) {
    seneca.act({
      role: 'web', use: {
        name: options.name,
        prefix: '/api',
        pin: {role: options.name, cmd: '*'},
        map: {
          closeSession: {POST: true, alias: 'user/{user_id}/session/close'},
          listUsers: {GET: true, alias: 'user'},
          loadUser: {GET: true, alias: 'user/{userId}'},
          createUser: {POST: true, data: true, alias: 'user'},
          updateUser: {PUT: true, data: true, alias: 'user'},
          deleteUser: {DELETE: true, alias: 'user/{userId}'},
          inviteUser: {POST: true, alias: 'invite/user'}
        }
      }
    }, done)
  }

  seneca.add('init: ' + options.name, init)

  return {
    name: options.name
  }
}
