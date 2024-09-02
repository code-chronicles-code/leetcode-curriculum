# @code-chronicles/util

A potpourri of TypeScript utility functions and constants with more than one potential appication.

These functions are usually individually imported, for example:

```ts
import { stripPrefix } from "@code-chronicles/util/stripPrefix";

// Prints "dy":
console.log(stripPrefix("howdy", "how"));

// Prints "hello":
console.log(stripPrefix("hello", "how"));
```

## Development

Like the rest of the [Code Chronicles Leetcode ecosystem](../../), this package is structured as a Node module, using [Yarn](https://yarnpkg.com/) as the package manager.

You can install dependencies by running `yarn`, either in this package's directory, or in the repository root. The usual `yarn format`, `yarn lint`, and `yarn typecheck` scripts are available to aid in development and occasionally to annoy. `yarn test` is also available, though we could definitely use more tests!

See also the repository's general [development guide](../../DEVELOPMENT.md).
