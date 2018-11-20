# Limbs 👊💥💫

Limbs is a tiny metaprogramming framework for JavaScript, and a set of
common JavaScript idioms that make up a fluent scripting environment.

Limbs is written in ECMAScript 5.1, and can be used in any environment,
including older browsers and embedded platforms, without requiring extra
build steps.

## Features

To learn more about how Limbs is built and what you can accomplish with it,
explore the following modules.

* limbs-core: Start here. Simple mixins with inversion of control
* limbs-private: True private members; getters and setters with hooks
* limbs-method: Methods that preserve their original binding
* limbs-eventemitter: EventEmitter-like interface on top of a RxJs event stream
* limbs-tree: Generic tree structure with root, relative paths, and current node
* limbs-file: Idiomatic access to local file system
* limbs-reload: Clear require cache
* limbs-run: Sandboxed evaluation of source code
* limbs-watch: Gaze wrapper that emits events

## Installation

The entire package can be installed with:

```
npm i limbs
```

(Or, alternatively, mix-and-match package from the above list.)

If you are using Limbs in a non-NPM environment, please feel free to port it
and submit a pull request :-)
