var Chairo = require('chairo')
var Hapi = require('hapi')
var Inert = require('inert')
var Concorda = require('./concorda')
var Bell = require('bell')
var Hapi_Cookie = require('hapi-auth-cookie')
var SenecaWeb = require('seneca-web')
var _ = require('lodash')

var Options = require('../config/config.production')
var DefaultOptions = {
  timeout: 500,
  secure: true,
  web: SenecaWeb
}

const default_options = _.extend({}, DefaultOptions, Options)

// Log and end the process
// if an error is encountered
function endIfErr (err) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
}


// Create our server.
var server = new Hapi.Server()
server.connection({port: process.env.PORT || 3050})

// Declare our Hapi plugin list.
var plugins = [
  Hapi_Cookie,
  Bell,
  {
    register: Chairo,
    options: default_options
  },
  Inert,
  Concorda
]

// Register our plugins, kick off the server
// if there is no error.
server.register(plugins, function (err) {
  endIfErr(err)

  var seneca = server.seneca

  seneca.ready(function (err) {
    endIfErr(err)

    server.start(function (err) {
      endIfErr(err)

      seneca.log.debug('server started: ', server.info.port)
    })
  })
})
