# Limbs

Limbs is a tiny object system for JavaScript.

Limbs is written in ECMAScript 5.1, so it can be used in any environment,
including older browsers and embedded platforms, without requiring extra build
steps.

Lims uses the magic of lexical scoping (closures) to implement features that
ES6 (ES2015+) classes still do not provide, such as trait-based multiple
inheritance (a.k.a. mixins), true private members, and methods that do not lose
their binding when separated from their object.

# Installation

Limbs is currently available on NPM, and can be installed with:

```
npm i limbs
```

If you are using Limbs in a non-NPM environment, please feel free to port it
and submit a pull request :-)

# Basic usage

The default export of the `limbs` module is its entry point, called the _factory_.
It is a is a very simple function. Each call to it creates a plain object of the
form `{ traits: [], private: {}, public: {} }`, called the `core`, and returns
its `public` member:

```
var New = require('limbs')
var myObject = New()
// {}
```

To pre-populate the returned object with useful functionality, you pass _traits_
to the factory. Two traits come pre-packaged with Limbs; those are the `Private`
trait and the `Public` trait.

```
var Private = New.Private
  , Public = New.Public
```

Or, in ES6, simply:

```
import New, { Private, Public } from 'limbs'
```

The `Private` and `Public` traits modify `core.private` and `core.public`.
Other than that distinction, they work in the same way:

```
myObject = New(
  Private({ X: 1 }),
  Public({ Y: 2 }))
// { Y: 2 }
```

Of course, private values are no good if you have no way to access them, and
this is where closures really shine: you can pass functions to `Public` and
`Private`. Each function gets passed the entire `core` (with all modifications
prior to that point already applied), so you can e.g. define getters and setters:

```
myObject = New(
  Private({ X: 1 }),
  Public(function (core) {
    Object.defineProperty(core.public, 'X', {
      enumerable: true,
      get: function () { return core.private.X }
      set: function (v) {
        var t = typeof v
        if (t !== 'number') throw new TypeError('X can only be a number, received: ' + t)
        core.private.X = v } }) })
myObject           // { X: [Getter/Setter] }
myObject.X         // 1
myObject.X = 2     // 2
myObject.X         // 2
myObject.X = 'foo' // TypeError thrown
```

In the above example:
* `myObject.X` (equivalent to `core.public.X`) is a custom property acting as a
  type guard for `core.private.X`.
* `core.private.X` is a separate variable, which is only accessible from the
  function that is passed to `Public`, but not from the outside.

Of course, this means you can also modify `core.public` from a function passed
to `Private`, and vice versa. It is your responsibility to only do this in ways
that make sense.

You can pass any number of arguments to `Private` and `Public`, and prefix them
with Boolean conditionals to quickly to quickly enable or disable them:
```
makeObject = function (exposePrivates) {
  return New(
    Private({ X: 1 }, exposePrivates && { privatesExposed: true }),
    Public(!)
}
myObject = New(
  Private(),
  Public(
    { X: 1 },
    false && { Y: 2, Z: 3 },
    { A: 4 }))
// { X: 1, A: 4 }
```

# Custom traits

# Philosophy
