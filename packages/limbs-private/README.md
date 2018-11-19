# limbs-private

## Installation

```
npm i --save limbs-core limbs-private
```

## Usage

```
Private = require('limbs-private')
Accessor = Private.Accessor
```
New(
  Private({ X: 1 }),
  Private.Accessor('X')
  Private.Accessor('tenTimesX',
    function getter (value) { return core.private.X * 10 }),
  PrivateAccessor('Y',
    function getter (core, 
    function setter (core
  Private.Accessor('
  Private.Accessor)
New(Private({ X: 1 }), Private.Getter('X')).X // 1
  Private.Getter('X', function (value) { return 

## Implementation

Under the hood, `Private` adds `core.private = {}` if missing, and keeps
private values there.

`Private.Accessor` is a less verbose wrapper around `Object.defineProperty`
and makes use of JavaScript's native getters and setters.

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


