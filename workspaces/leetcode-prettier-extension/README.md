# @code-chronicles/leetcode-prettier-extension

Chrome extension to replace LeetCode's code formatter with Prettier.

To use:

1. **Build the extension:**

   ```sh
   # It's easiest to do this from the package's directory:
   cd workspaces/leetcode-prettier-extension

   # Install dependencies, if you haven't already:
   yarn

   # Build the extension:
   yarn build
   ```

2. **Load the extension into Chrome.** The built extension will be in a directory named `dist`. You will have to load it as an "unpacked extension", using Developer mode. See [the official tutorial](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked).

## Development

Like the rest of the [Code Chronicles Leetcode ecosystem](../../), this package is structured as a Node module, using [Yarn](https://yarnpkg.com/) as the package manager.

You can install dependencies by running `yarn`, either in this package's directory, or in the repository root. The usual `yarn format`, `yarn lint`, and `yarn typecheck` scripts are available to aid in development and occasionally to annoy. Read more in the repository's general [development guide](../../DEVELOPMENT.md).

This package supports an additional `package.json` script:

### `yarn build`

Builds (an unpacked version of) the extension, in a `dist` directory within the package's workspace.
