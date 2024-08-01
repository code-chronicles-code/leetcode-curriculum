# @code-chronicles/leetcode-api

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)

## Overview

This package is a TypeScript library for reading data from LeetCode! It's part of the larger [Code Chronicles Leetcode ecosystem](https://github.com/code-chronicles-code/leetcode-curriculum) and it's used to power sibling packages like:

- [`@code-chronicles/download-submissions`](https://github.com/code-chronicles-code/leetcode-curriculum/workspaces/download-submissions/), which downloads the logged-in user's LeetCode submissions
- [`@code-chronicles/fetch-leetcode-problem-list`](https://github.com/code-chronicles-code/leetcode-curriculum/workspaces/fetch-leetcode-problem-list/), which fetches the metadata of all LeetCode problems
- [`@code-chronicles/post-potd`](https://github.com/code-chronicles-code/leetcode-curriculum/workspaces/post-potd/), which queries LeetCode's problem of the day and posts about it in a Discord channel

## `package.json` Scripts

The following scripts are available for this package:

### `yarn format`

Makes sure all files in this package are properly formatted, rewriting them if necessary using Prettier.

### `yarn lint`

Lints package files using ESLint.

### `yarn typecheck`

Checks the type correctness of the package code, using the TypeScript compiler.
