var test = require('tape')
  , Do = require('./do')
  , New = require('.')

test('do', async function (t) {
  t.equal(await Do(), undefined)
  t.equal(await Do(1), 1)
  t.equal(await Do(1, 2), 2)
  t.equal(await Do(2, x=>x*x), 4)
  t.equal(await Do(2, x=>x*x, Promise.resolve(6)), 6)
  t.equal(await Do(2, x=>x*x, x=>Promise.resolve(x*2)), 8)
  t.end() })

test('new', function (t) {
  t.deepEqual(New(), {})
  t.deepEqual(New({X:1}, false&&{Y:2}, {Z:3}), {X:1, Z:3})
  t.end()})
