'use strict'

const _ = require('lodash')

module.exports = function (opts) {
  var seneca = this

  var options = {
    name: 'user_group'
  }
  options = _.extend(options, opts || {})

  function list (msg, response) {
    this.make$('user_group').list$({}, function (err, userGroup) {
      if (err) {
        return response(err)
      }

      userGroup = userGroup || []
      for (var i in userGroup) {
        userGroup[i] = userGroup[i].data$(false)
      }
      response(null, {data: userGroup})
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
        list: {GET: true, alias: 'user/group'}
      }
    }
  })

  return {
    name: options.name
  }
}
