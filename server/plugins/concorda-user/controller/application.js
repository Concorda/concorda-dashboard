'use strict'

module.exports = function () {
  var seneca = this
  var name = 'applicationCtrl'

  function list( msg, response ) {
    this.make$('application').list$({}, function(err, apps){
      console.log()
    })
  }

  function create( msg, response ) {
    this.make$('application', msg.data).save$(function(err, app){
      console.log(app)
      response(null, app.data$(false))
    })
  }

  seneca
    .add( {role: name, cmd: 'list'}, list )
    .add( {role: name, cmd: 'create'}, create )

  seneca.act( {role: 'web', use: {
    name: name,
    prefix: '/api',
    pin: {role: name, cmd: '*'},
    map: {
      list: { GET: true, alias: 'application'},
      create: { POST: true, data: true, alias: 'application'}
    }
  }} )

  return {
    name: 'concorda-user-application'
  }
}