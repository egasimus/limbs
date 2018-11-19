# Limbs 👊💥💫

Limbs is a tiny metaprogramming framework for JavaScript.

Limbs is written in ECMAScript 5.1, and can be used in any environment,
including older browsers and embedded platforms, without requiring extra build
steps.

Limbs uses the magic of lexical scoping (closures) to implement features that
ES6 (ES2015+) classes still do not provide, such as trait-based multiple
inheritance (a.k.a. mixins), true private members, and methods that do not lose
their binding when separated from their object.

## Installation

Limbs is currently available on NPM, and can be installed with:

```
npm i limbs
```

If you are using Limbs in a non-NPM environment, please feel free to port it
and submit a pull request :-)

## Basic usage

The default export of the `limbs` module is its entry point, called `New`.
(Capitalized, so as not to clash with JavaScript's built-in `new`.)
It is a is a very simple function. Each call to it creates a plain object of the
form `{ traits: [], private: {}, public: {} }`, called the `core`; applies any
passed _traits_ to it, and returns its `public` member:

```
var New = require('limbs')
var myObject = New() // {}
var myObject = New(function iAmATrait (core) {
  core.public = core.traits }) // ['iAmATrait']
```

To pre-populate the returned object with useful functionality, you pass _traits_
to the factory. Two traits come pre-packaged with Limbs; those are the `Private`
trait and the `Public` trait.

```
var Private = New.Private
  , Public  = New.Public
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
  Public({ Y: 2 })
)
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
    core.public.Y = 'plain value'
    Object.defineProperty(core.public, 'X', {
      enumerable: true,
      get: function () { return core.private.X }
      set: function (v) {
        var t = typeof v
        if (t !== 'number') throw new TypeError('X can only be a number, received: ' + t)
        core.private.X = v } }) })
myObject           // { X: [Getter/Setter], Y: 'plain value' }
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

_Of course, passing the entire `core` means you can also modify `core.public`
from a function passed to `Private`, and vice versa. It is your responsibility
to only do this where it makes sense._

Let's try rewriting that example with a little more composability:

```
function typeGuard (propertyName, expectedType) {
  var errorMessage = propertyName + ' can only be a ' + expectedType + ', received: '
  return function installTypeGuard (core) {
    Object.defineProperty(core.public, propertyName, {
      enumerable: true,
      get: function () { return core.private[propertyName] }
      set: function (newValue) {
        var typeOfNewValue = typeof newValue
        if (typeOfNewValue !== expectedType) throw new TypeError(errorMessage + typeOfNewValue)
        core.private[propertyName] = newValue } }) } }
myObject = New(
  Private({
    X: 1,
    Y: 'foo'}),
  Public(
    typeGuard('X', 'number'),
    typeGuard('Y', 'string')))
```

Hey presto! We've factored out the validation into a separate function. Thanks
to closures, the names and expected types of private properrties (defined at
one time) and their actual values and memory locations (defined at another time)
end up in the same scope, letting you implement your logic in small, manageable
chunks. We've also _memoized_ part of the error message.

As you saw above, you can pass as many arguments as you like to `Private` and
`Public`. If you prefix any argument passed to `Private`, `Public` or `New` with
a Boolean conditional that evaluates to `false`, it will simply be ignored.
This gives you convenient way to quickly enable or disable layers of functionality.

The last thing you need to know is that if you return an object from a function
that you've passed to `New`, `Private`, or `Public`, that object will _replace_
`core`, `core.private`, and `core.public` entirely. This is to enable
immutable-style operations, such as using ES6 Object.assign/object spread
syntax, or to patch in ImmutableJS.

## Custom traits

One of the main focuses of Limbs is _brevity_. Let's continue with the above
examples and implement a single `Typed` trait that gets rid of the
`Private(/*names + default values*/)` and `Public(/*names + types*/)`:
repetition and can be used as follows:

```
myObject = New(
  Typed('X', 'number', 1),
  Typed('Y', 'string', 'foo'))
```

```
var Typed = function (propertyName, expectedType, initialValue) {
  var errorMessage = propertyName + ' can only be a ' + expectedType + ', received: '
  return function Typed (core) {
    var initial = {}
    initial[propertyName] = initialValue
    Private(initial)(core)
    Public(installTypeGuard(propertyName, expectedType))(core) }
  function installTypeGuard (core) {
    /* same as installTypeGuard above */ } }
```

Or, in ES6:

```
const Typed = (propertyName, expectedType, initialValue) => {
  const errorMessage = `${propertyNAme} can only be a ${expectedType}, received:`
  return function Typed (core) {
    Private({ [propertyName]: initialValue })(core)
    Public(installTypeGuard(propertyName, expectedType))(core) }
  function installTypeGuard (core) { /* ... */ } }
```

You can use this approach to e.g. integrate your custom model/form validation
with JavaScript's normal property assignment operator.

## Philosophy
