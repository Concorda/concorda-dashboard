'use strict'

var Hapi = require('hapi')
var Bell = require('bell')
var Chairo = require('chairo')
var Cookie = require('hapi-auth-cookie')
var Inert = require('inert')
var Nes = require('nes')
var Frontend = require('./frontend')
var Backend = require('./backend')
var DotEnv = require('dotenv')

// load env config file
DotEnv.config({path: './config/production.env'})

// Options for our hapi plugins.
var opts = {
  server: {
    port: process.env.PORT || 3050
  },
  chairo: {
    timeout: 4000,
    secure: true,
    log: 'print'
  }
}

// Log and end the process on err.
function endIfErr (err) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
}

// Create our server.
var server = new Hapi.Server({ debug: { request: ['error'] } })
server.connection({port: opts.server.port})

// Declare our Hapi plugin list.
var plugins = [
  {register: Bell},
  {register: Cookie},
  {register: Chairo, options: opts.chairo},
  {register: Nes},
  {register: Inert},
  {register: Frontend},
  {register: Backend}
]

// Register our plugins.
server.register(plugins, function (err) {
  endIfErr(err)

  // Kick off the server.
  server.start(function (err) {
    endIfErr(err)

    console.log('Listening at: ' + server.info.port)
  })
})
