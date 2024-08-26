# @code-chronicles/eslint-config

A rather aggressive reusable [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files).

This config is used to lint the TypeScript and JavaScript throughout this entire repository. Rather than inheriting from some popular configs, I thought it would be fun to familiarize myself with the breadth of ESLint rules available.

To use as-is, create an `eslint.config.mjs` that re-exports this package:

```ts
export { default } from "@code-chronicles/eslint-config";
```

Or, if you need to ignore some files, for example a `dist/` directory:

```ts
import config from "@code-chronicles/eslint-config";

export default [...config, { ignores: ["dist/"] }];
```

## Development

Like the rest of the [Code Chronicles Leetcode ecosystem](../../), this package is structured as a Node module, using [Yarn](https://yarnpkg.com/) as the package manager.

You can install dependencies by running `yarn`, either in this package's directory, or in the repository root. The usual `yarn format` and `yarn lint` commands are available, but for the time being there is no `yarn typecheck`, since this package is pure JavaScript rather than TypeScript. (However, it hopefully will be [in the near future](https://eslint.org/docs/latest/use/configure/configuration-files#typescript-configuration-files)!)

See also the repository's general [development guide](../../DEVELOPMENT.md).
