const isReq = require('is-incoming-message')
const isRes = require('is-server-response')
const mapLimit = require('map-limit')
const dezalgo = require('dezalgo')
const assert = require('assert')
const noop = require('noop2')

module.exports = httpMiddleware

// create a middleware stack
// (obj, obj, [fn(obj, obj, fn?)], fn) -> null
function httpMiddleware (req, res, arr, done) {
  done = done || noop

  assert.ok(isReq(req), 'is incoming message')
  assert.ok(isRes(res), 'is server response')
  assert.ok(Array.isArray(arr), 'is array')
  assert.equal(typeof done, 'function', 'is function')

  mapLimit(arr, 1, iterator, done)

  function iterator (fn, next) {
    next = dezalgo(next)
    if (fn.length === 3) return fn(req, res, next)
    fn(req, res)
    next()
  }
}
