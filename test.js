var test = require('tape')
  , limbs = require('.')
  , Public = limbs.Public
  , Private = limbs.Private

test('empty factory', function (t) {
  t.deepEqual(limbs(), {})
  t.end() })

test('factory + Public/Private trait', function (t) {
  var obj = limbs(
    Public
      (),
    Private
      (),
    Public
      ({ A: 1 }),
    Private
      ({ B: 2 }),
    Public
      ( function (core) { core.public.C = 3 }
      , function (core) { core.private.D = 4 }
      , function (core) { return { AplusC: core.public.A + core.public.C, E: 5 } }),
    Private
      ( function (core) { core.public.F = 5 }
      , function (core) { core.private.F = 7 }
      , function (core) { return { FmulB: core.private.F * core.private.B, G: 7 } }),
    Public
      ( function (core) {
          Object.defineProperty(core.public, 'G', { enumerable: true, get:
            function () { return String(core.private.G + core.private.FmulB) } }) }) )

  obj.G = 'this change will be ignored'
  obj.H = 'not this'

  t.deepEqual(obj, {
    AplusC: 4,
    E: 5,
    F: 5,
    G: '21',
    H: 'not this'
  })

  t.end() })
