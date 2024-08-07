# Development Guide

## `package.json` Scripts

The following scripts are available both at the repository level as well as within each individual package.

Running the script within a package's workspace affects only that package, whereas running it in the repository root will make it apply to the entire repository.

### `yarn format`

Makes sure all files are properly formatted, rewriting them if necessary. Usually uses [Prettier](https://prettier.io/), but may also use other tools as necessary. (For example, the Python code in the [Adventure Pack](workspaces/adventure-pack/) is formatted using [Black](https://black.readthedocs.io/).)

### `yarn lint`

Lints files! Currently ESLint is the only linter, but it would be nice to have more. Perhaps you'd like to [add another one](CONTRIBUTING.md)?

### `yarn test`

For the packages that have tests, runs those tests!

### `yarn typecheck`

Checks the type correctness of the code. Currently only TypeScript files are checked, using the TypeScript compiler. Java and Kotlin code in the [Adventure Pack](workspaces/adventure-pack/) is checked indirectly, when we attempt to compile it.
