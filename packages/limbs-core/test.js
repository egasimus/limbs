var test = require('tape')
  , New = require('.')
  , Public = require('.').Public

test('empty factory', function (t) {
  t.deepEqual(New(), {})
  t.end() })
