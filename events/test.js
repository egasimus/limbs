var test = require('tape')
  , Do = require('../core/do')
  , Events = require('.')

test('on', async (t) => {
  var state = await Do(Events())
  console.log(state.Events)
  t.equal(typeof state.Events.on, 'function')
  t.equal(typeof state.Events.emit, 'function')
  var count = 0
  var listener = state.Events.on('event', function () { count++ })
  t.equal(typeof listener.unsubscribe, 'function')
  state.Events.emit('event')
  t.equal(count, 1)
  state.Events.emit('event')
  t.equal(count, 2)
  t.end() })

test('once', async (t) => {
  var state = await Do(Events())
  t.equal(typeof state.Events.once, 'function')
  var count = 0
  state.Events.once('event', function () { count++ })
  state.Events.emit('event')
  t.equal(count, 1)
  state.Events.emit('event')
  t.equal(count, 1)
  t.end() })

test.skip('off', async (t) => {
  var state = await Do(Events())
  t.equal(typeof state.Events.off, 'function')
})

test.skip('onAny', async (t) => {
  const state = await Do(Events())
  t.equal(typeof state.Events.onAny, 'function')
})

test.skip('custom predicate', function (t) {})

test.skip('idempotent', async (t)=>{

  let counter = 0
  let state = await Do(Events(
    [ 'Event1', ()=>{ counter++ } ]
  ))

  state.Events.emit('Event1')
  t.equal(counter, 1)

  state.Events.emit('Event1')
  t.equal(counter, 2)

  state = await Do(state, Events(
    [ 'Event1', ()=>{ counter-- } ]
  ))

  state.Events.emit('Event1')
  t.equal(counter, 1)

  state.Events.emit('Event1')
  t.equal(counter, 0)

  console.log(state)
  t.end()

})
