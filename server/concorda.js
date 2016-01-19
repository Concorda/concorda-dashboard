var Path = require('path')
var Package = require('../package.json')
var SenecaUser = require('seneca-user')
var SenecaAuth = require('seneca-auth')

var ClientRoutes = require('./routes/client')

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


  // Set up a default user
  seneca.act({
    role: 'user',
    cmd: 'register',
    name: process.env.USER_NAME || 'Admin',
    email: process.env.USER_EMAIL || 'admin@concorda.com',
    password: process.env.USER_PASS || 'concorda'
  }, function (err, user){
    if (err){
      seneca.log.debug('Cannot register default user', err)
    }
    else {
      seneca.log.debug('Default user registered', user)
    }
  })

  next()
}

// Hapi uses this metadata. It's convention to provide
// it even though we are actually the same package.
module.exports.attributes = {
  pkg: Package
}
