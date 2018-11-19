# Limbs Core

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

Passing one or more objects to `New` merges them (using shallow copy):

```
> New({ X: 1 }, { Y: 2 })
{ X: 1, Y: 2 }
```

You can also pass functions to `New`:

```
> New({ X: 1 }, function (core) { core.public.Y = 2; console.log(core) })
{ traits: [ '' ], has: [Function has], public: { X: 1, Y: 2 } }
{ X: 1, Y: 2 }
```

The `core` is a hidden metadata layer which wraps `public` and is normally
only accessible in functions passed to `New`. Those functions are called
_traits_ and are evaluated in the sequence in which they are passed.

A trait can mutate any part of the _core_, or replace the entire core outright
by returning a non-falsy value.

```
> function MyTrait (core) {
... console.log(core.traits)
... console.log(core.has('MyTrait'))
... console.log(core.has('MyOtherTrait'))
... core.myPrivateValue = 'hello limbs'
... core.public.myValue = 'hello' }
[Function: MyTrait]
> function MyOtherTrait (core) {
... console.log(core.traits)
... console.log(core.has('MyTrait'))
... console.log(core.myPrivateValue)
... core.public.myValue = core.public.myValue + ' world' }
[Function: MyOtherTrait]
> function MyDangerousTrait (core) {
... console.log(core.public)
... return { public: 'here we go again' }
}
[Function: MyDangerousTrait]
> New(MyTrait, MyOtherTrait, MyDangerousTrait)
[ 'MyTrait' ]
true
false
[ 'MyTrait', 'MyOtherTrait' ]
true
true
hello limbs
hello world
'here we go again'
```

## See also

For a basic usage of custom parametric traits, see limbs-private.
