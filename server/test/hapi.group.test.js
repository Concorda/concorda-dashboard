'use strict'

var Assert = require('assert')

const ConcordaUser = require('../plugins/concorda-user/app')

var Lab = require('lab')
var lab = exports.lab = Lab.script()
var suite = lab.suite
var test = lab.test
var before = lab.before
var after = lab.after

var Util = require('./hapi-init.js')

suite('Hapi user group suite tests ', function () {
  var cookie
  var server
  var user = {nick: 'u1', name: 'nu1', email: 'u1@example.com', password: 'u1', active: true}

  before({}, function (done) {
    Util.init({}, function (err, srv) {
      Assert.ok(!err)

      server = srv
      var seneca = server.seneca

      seneca.use(ConcordaUser)

      // add a default vidi service
      seneca.make$('user_group', {name: 'vidi'}).save$({}, function (err, connectedServices) {
        if (err) {
          return done(err)
        }
        done()
      })
    })
  })

  after({}, function (done) {
    server.seneca.close()
    done()
  })

  test('register user test', function (done) {
    var url = '/auth/register'

    server.inject({
      url: url,
      method: 'POST',
      payload: user
    }, function (res) {
      Assert.equal(200, res.statusCode)
      Assert(JSON.parse(res.payload).ok)
      Assert(JSON.parse(res.payload).user)
      Assert(JSON.parse(res.payload).login)

      cookie = Util.checkCookie(res)

      done()
    })
  })


  test('list groups test', function (done) {
    var url = '/api/user/group'

    server.inject({
      url: url,
      method: 'GET',
      headers: { cookie: 'seneca-login=' + cookie }
    }, function (res) {
      Assert.equal(200, res.statusCode)
      Assert.equal(1, JSON.parse(res.payload).data.length)

      done()
    })
  })
})
