var test = require('tape')
  , New = require('limbs-core')
  , Events = require('.')

test('on', function (t) {
  var emitter = New(Events())
  t.equal(typeof emitter.on, 'function')
  t.equal(typeof emitter.emit, 'function')
  var count = 0
  var listener = emitter.on('event', function () { count++ })
  t.equal(typeof listener.unsubscribe, 'function')
  emitter.emit('event')
  t.equal(count, 1)
  emitter.emit('event')
  t.equal(count, 2)
  t.end() })

test('once', function (t) {
  var emitter = New(Events())
  t.equal(typeof emitter.once, 'function')
  var count = 0
  emitter.once('event', function () { count++ })
  emitter.emit('event')
  t.equal(count, 1)
  emitter.emit('event')
  t.equal(count, 1)
  t.end() })

test.skip('off', function (t) {
  var emitter = New(Events())
  t.equal(typeof emitter.off, 'function')
})

test.skip('onAny', function (t) {
  var emitter = New(Events())
  t.equal(typeof emitter.onAny, 'function')
})

test.skip('custom predicate', function (t) {})
