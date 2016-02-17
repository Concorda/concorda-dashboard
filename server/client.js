'use strict'

const _ = require('lodash')
var Jsonic = require('jsonic')

module.exports = function (opts) {
  var seneca = this

  var options = {
    name: 'concorda-client'
  }

  function listClients (msg, response) {
    var limit = msg.limit
    var skip = msg.skip
    var orderBy = msg.order

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

    this.make$('client', 'data').list$(q, function (err, clients) {
      if (err) {
        return response(null, {ok: false, why: err})
      }
      clients = clients || []

      for (var i in clients) {
        clients[i] = clients[i].data$(false)
      }

      response(null, {ok: true, data: clients, count: clients.length})
    })
  }

  function createClient (msg, response) {
    var clientData = msg.data

    this.make$('client', 'data', clientData).save$({}, function (err, settings) {
      if (err) {
        return response(null, {ok: false, why: err})
      }
      response(null, {ok: true, data: settings.data$(false)})
    })
  }

  function deleteClient (msg, response) {
    var clientId = msg.clientId

    var that = this

    // delete client settings
    this.make$('client', 'settings').remove$({clientId: clientId}, function (err) {
      if (err) {
        return response(null, {ok: false, why: err})
      }

      // now delete client
      that.make$('client', 'data').remove$({id: clientId}, function (err) {
        if (err) {
          return response({ok: false, why: err})
        }
        response(null, {ok: true})
      })
    })
  }

  function loadClientSettings (msg, response) {
    var clientId = msg.clientId

    this.make$('client', 'settings').load$({clientIdd: clientId}, function (err, settings) {
      if (err) {
        return response(null, {ok: false, why: err})
      }
      settings = settings || {}

      settings = settings.data$(false)

      response(null, {ok: true, data: settings})
    })
  }

  seneca
    .add({role: options.name, cmd: 'listClients'}, listClients)
    .add({role: options.name, cmd: 'listClientsAlias'}, listClients)
    .add({role: options.name, cmd: 'createClient'}, createClient)
    .add({role: options.name, cmd: 'deleteClient'}, deleteClient)
    .add({role: options.name, cmd: 'loadClientSettings'}, loadClientSettings)

  function init (args, done) {
    seneca.act({
      role: 'web', use: {
        name: options.name,
        prefix: '/api',
        pin: {role: options.name, cmd: '*'},
        map: {
          listClients: {GET: true, alias: 'client'},
          listClientsAlias: {GET: true, alias: 'clients'},
          loadClientSettings: {GET: true, alias: 'client/:clientId/settings'},
          createClient: {POST: true, PUT: true, data: true, alias: 'client'},
          deleteClient: {DELETE: true, alias: 'client/{clientId}'}
        }
      }
    }, done)
  }

  seneca.add('init: ' + options.name, init)

  return {
    name: options.name
  }
}
