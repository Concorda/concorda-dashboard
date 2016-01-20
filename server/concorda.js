var Path = require('path')
var Package = require('../package.json')
var SenecaUser = require('seneca-user')
var SenecaAuth = require('seneca-auth')

// load plugins
var MongoDB = require('mongo-store')
var ConcordaUser = require('../server/plugins/concorda-user/app')

var ClientRoutes = require('./routes/client')
var DefaultData = require('./default_data')

module.exports = function (server, options, next) {
  // Set our realitive path (for our routes)
  var relativePath = Path.join(__dirname, '../dist/')
  server.realm.settings.files.relativeTo = relativePath

  // Session stuff
  server.state('session', {
    ttl: 24 * 60 * 60 * 1000,
    isSecure: true,
    path: '/',
    encoding: 'base64json'
  })

  // Wire up our http routes, these are
  // mostly for managing the dashboard.
  server.route(ClientRoutes)

  // Set up our seneca plugins
  var seneca = server.seneca

  seneca.use(SenecaUser)
  seneca.listen({
    pin: 'role:user, cmd:*',
    type: 'tcp',
    port: '3055'
  })
  seneca.use(SenecaAuth, {
    restrict: '/api',
    server: 'hapi',
    strategies: [
      {
        provider: 'local'
      }
    ]
  })
  seneca.use(require('seneca-local-auth'))


  // Set up a default user
  seneca.use(DefaultData())

  seneca.use(MongoDB, seneca.options().db)

  seneca.use(ConcordaUser)
  next()
}

// Hapi uses this metadata. It's convention to provide
// it even though we are actually the same package.
module.exports.attributes = {
  pkg: Package
}
