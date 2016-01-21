'use strict'

const Assert = require('assert')

const ConcordaUser = require('../plugins/concorda-user/user')

const Lab = require('lab')
const lab = exports.lab = Lab.script()
const suite = lab.suite
const test = lab.test
const before = lab.before
const after = lab.after

var Util = require('./hapi-init.js')

suite('Hapi user suite tests ', () => {
  let server
  let cookie
  let user = {nick: 'u1', name: 'nu1', email: 'u1@example.com', password: 'u1', active: true}

  before({}, function (done) {
    Util.init({}, function (err, srv) {
      Assert.ok(!err)

      server = srv
      var seneca = server.seneca

      seneca.use(ConcordaUser)

      done()
    })
  })

  after({}, (done) => {
    server.seneca.close()
    done()
  })

  test('register user test', (done) => {
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

  test('list user test', (done) => {
    var url = '/api/user'

    server.inject({
      url: url,
      method: 'GET',
      headers: { cookie: 'seneca-login=' + cookie }
    }, function (res) {
      Assert.equal(200, res.statusCode)
      Assert.equal(1, JSON.parse(res.payload).data.length)
      Assert.equal(1, JSON.parse(res.payload).count)

      done()
    })
  })
})
