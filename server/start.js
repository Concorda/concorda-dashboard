
var Chairo = require('chairo')
var Hapi = require('hapi')
var Inert = require('inert')
var Bell = require('bell')
var Cookie = require('hapi-auth-cookie')
var SenecaAuth = require('seneca-auth')
var SenecaWeb = require('seneca-web')
var SenecaUser = require('seneca-user')

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
  Inert,
  Bell,
  Cookie,
  {
    register: Chairo,
    options: {
      timeout: 500,
      secure: true,
      web: SenecaWeb
    }
  }
]

// Register our plugins, kick off the server
// if there is no error.
server.register(plugins, function (err) {
  endIfErr(err)

  var seneca = server.seneca

  seneca.use(SenecaUser)
  seneca.use(SenecaAuth, {
    restrict: '/api',
    server: 'hapi',
    strategies: [
      {
        provider: 'local'
      }
    ]
  })

  seneca.listen({
    pin: 'role:user, cmd:*',
    type: 'tcp',
    port: '3055'
  })

  seneca.ready(function (err) {
    endIfErr(err)

    server.start(function (err) {
      endIfErr(err)

      console.log('server started: ' + server.info.port)
    })
  })
})
