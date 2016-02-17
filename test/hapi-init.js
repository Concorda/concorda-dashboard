var Chairo = require('chairo')
var Hapi = require('hapi')
var Bell = require('bell')
var Hapi_Cookie = require('hapi-auth-cookie')

exports.init = function (options, done) {
  var server = new Hapi.Server()
  server.connection()

  server.register([Hapi_Cookie, Bell, {
    register: Chairo,
    options: {
      web: require('seneca-web')
    }
  }], function (err) {
    if (err) {
      return done(err)
    }

    var si = server.seneca

    si.use('user')
    si.use(
      require('seneca-auth'),
      {
        secure: true,
        restrict: '/api'
      })
    si.ready(function () {
      done(null, server)
    })
  })
}

exports.checkCookie = function (res) {
  var cookie = res.headers['set-cookie'][0]
  cookie = cookie.match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/)[1]
  return cookie
}
