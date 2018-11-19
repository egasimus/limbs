var test = require('tape')
  , New = require('.')
  , Public = require('.').Public

test('empty factory', function (t) {
  t.deepEqual(New(), {})
  t.end()})

test('static trait', function (t) {
  t.deepEqual(New({X:1}, false&&{Y:2}, {Z:3}), {X:1, Z:3})
  t.end()})
