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
      , function (core) { return { D: 4 } }
      , function (core) { core.public.E = 4; return { E: 5 } }),
    Private
      ( function (core) { return { F: 5 } }
      , function (core) { core.private.F = 7 }
      , function (core) { core.public.F = core.private.B * core.public.C; return { G: 7 } }),
    Public
      ( function (core) {
          Object.defineProperty(core.public, 'G', { enumerable: true, get:
            function () { return String(core.private.G) } }) }) )

  obj.G = 'this change will be ignored'
  obj.H = 'not this'

  t.deepEqual(obj, {
    A: 1,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: '7',
    H: 'not this'
  })

  t.end() })
