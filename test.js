const port = require('get-server-port')
const test = require('tape')
const http = require('http')
const nets = require('nets')

const middleware = require('./')

test('should assert input types', function (t) {
  t.plan(5)
  t.throws(middleware, /incoming message/)

  const server = http.createServer(function (req, res) {
    t.throws(middleware.bind(null, req), /server response/)
    t.throws(middleware.bind(null, req, res), /is array/)
    t.doesNotThrow(middleware.bind(null, req, res, []))
    t.throws(middleware.bind(null, req, res, [], 123))
    res.end()
    this.close()
  }).listen()
  nets('http://localhost:' + port(server))
})

test('should execute functions in sequence', function (t) {
  t.plan(3)
  var n = 0

  const server = http.createServer(function (req, res) {
    const mw = [
      function (req, res, next) {
        setTimeout(t.equal.bind(t, n++, 0), 100)
        next()
      },
      function (req, res, next) {
        t.equal(n++, 1)
        next()
      }
    ]
    middleware(req, res, mw, function () {
      t.equal(n, 2)
      res.end()
      server.close()
    })
  }).listen()
  nets('http://localhost:' + port(server))
})

test('should have an optional `next()` function', function (t) {
  t.plan(3)
  var n = 0

  const server = http.createServer(function (req, res) {
    const mw = [
      function (req, res) {
        t.equal(n++, 0)
      },
      function (req, res) {
        t.equal(n++, 1)
      }
    ]
    middleware(req, res, mw, function () {
      t.equal(n, 2)
      res.end()
      server.close()
    })
  }).listen()
  nets('http://localhost:' + port(server))
})
