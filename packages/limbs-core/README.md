# limbs-core

## Installation

```
npm i --save limbs-core
```

## Basic usage

The default export of `limbs-core` is a function called `New` - capitalized,
so as not to be mistaken with JavaScript's built-in `new`. Calling it returns
an empty object.

```
> New = require('limbs-core')
[Function: New]
> New()
{}
```

Passing one or more objects to `New` merges them (using shallow copy).
Falsy values are just ignored, giving you a convenient way to toggle things.

```
> New({ X: 1 }, false && { Y: 2 }, { Z: 3 })
{ X: 1, Z: 3 }
```

You can also pass functions to `New`. These functions are called _traits_ and
are used to define reusable functionality. Most of the Limbs modules that you
will encounter implement one or more traits.

Internally, `New` creates an object referred to as the `core`, which is normally
only accessible to traits - a sort of hidden metadata layer. The core needs to
have at least a member called `core.public`; this is what New returns after
going through all the traits. During that time, the traits are run in order,
_bound_ to the `core` - i.e. the current `core` is accessible via `this` from
a trait function, and you can modify the output of `New` by modifying `this.public`.

```
> New({ X: 1 }, function () { this.public.Y = 2; console.log(this) })
{ public: { X: 1, Y: 2 } }
{ X: 1, Y: 2 }
```

A trait can work in a mutable or an immutable style. If it mutates the core
in place, it is expected to return a falsy value (so just skip `return`); if a
non-falsy value is returned, it will replace the entire core for the rest of the
initialization.

There's little use in having anything else but an object as `core` or
`core.public`, however Limbs does not try to prevent it:

```
function Trait1 () {
  this.myPrivateValue = 'hello limbs'
  this.public.myValue = 'hello' }
function Trait2 () {
  console.log(this.myPrivateValue)
  this.public.myValue = this.public.myValue + ' world' }
function Trait3 () {
  console.log(this.public)
  return { public: 'here we return a string' } }

New(MyTrait, MyOtherTrait, MyDangerousTrait)
// prints: hello limbs
// prints: { myValue: 'hello world' }
// returns: 'here we return a string'
```

```
function Trait4 () {
  return 'here we replace the core with a string' } }
function Trait5 () {
  return { public: this.length } }

New(Trait4, Trait5)
// returns: 38
```

The first argument to each trait is a function called `add`, which can be
called from one trait to include another, enabling grouping and composition
of traits.

```
function MyMetaTrait (add) {
  add(Trait4)
  add(Trait5)
}
New(MyMetaTrait) // equivalent to the previous example
```

Things get interesting with parametric traits:

```
function MyTraitConstructor () {
  var options = Array.prototype.slice.call(arguments)
  return function MyParametricTrait (add) {
    options.forEach(add) } }
New(Trait1, Trait2, MyTraitConstructor(Trait3, Trait4))
```

## See also

For a basic example of a custom parametric trait (which does something useful),
see limbs-private.
