'use strict'

const _ = require('lodash')

module.exports = function (opts) {
  var seneca = this

  var options = {
    name: 'connected-service'
  }
  options = _.extend(options, opts || {})

  function list (msg, response) {
    this.make$('connected_service').list$({}, function (err, connectedServices) {
      if (err) {
        return response(err)
      }

      connectedServices = connectedServices || []
      for (var i in connectedServices) {
        connectedServices[i] = connectedServices[i].data$(false)
        response(null, {data: connectedServices})
      }
    })
  }

  seneca
    .add({role: options.name, cmd: 'list'}, list)

  seneca.act({
    role: 'web', use: {
      name: options.name,
      prefix: '/api',
      pin: {role: options.name, cmd: '*'},
      map: {
        list: {GET: true, alias: 'connectedService'}
      }
    }
  })

  return {
    name: options.name
  }
}
