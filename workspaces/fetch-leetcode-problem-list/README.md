# @code-chronicles/fetch-leetcode-problem-list

![Status of the GitHub Actions workflow that updates the LeetCode problem data in this repository](https://github.com/code-chronicles-code/leetcode-curriculum/actions/workflows/update-problem-data.yml/badge.svg)

Fetch metadata of _all_ the LeetCode problems and save it in [JSON Lines](https://jsonlines.org/) format.

Powered by [`@code-chronicles/leetcode-api`](../leetcode-api/).

To run the development version:

```sh
# Install dependencies, if you haven't already:
yarn

# This command should work from any directory in the repository:
yarn workspace @code-chronicles/fetch-leetcode-problem-list start

# Alternatively, make sure you're in the package's directory:
cd workspaces/fetch-leetcode-problem-list
yarn start

# Examine the output:
cat workspaces/fetch-leetcode-problem-list/problems.jsonl
```

Or, build and run a distribution version:

```sh
# It's easiest to do this from the package's directory:
cd workspaces/fetch-leetcode-problem-list

# Install dependencies, if you haven't already:
yarn

# Package the script into an executable:
yarn build

# Run it with Node!
node dist/fetch-leetcode-problem-list.js

# Or if your system can handle executable files, try running it directly:
./dist/fetch-leetcode-problem-list.js

# Examine the output:
cat problems.jsonl
```

Each line of the output is JSON metadata for a problem, for example:

<!-- prettier-ignore-start -->
```json
{"difficulty":"Easy","isPaidOnly":false,"questionFrontendId":1,"title":"Two Sum","titleSlug":"two-sum"}
```
<!-- prettier-ignore-end -->

This repository includes [a Github Actions workflow](../../.github/workflows/post-potd.yml) for saving the problems metadata every week.

## Development

Like the rest of the [Code Chronicles Leetcode ecosystem](../../), this package is structured as a Node module, using [classic Yarn](https://classic.yarnpkg.com/) as the package manager.

You can install dependencies by running `yarn`, either in this package's directory, or in the repository root. The usual `yarn format`, `yarn lint`, and `yarn typecheck` scripts are available to aid in development and occasionally to annoy. Read more in the repository's general [development guide](../../DEVELOPMENT.md).

This package supports an additional `package.json` script:

### `yarn build`

Builds a distribution version of this package, in a `dist` directory within the package's workspace.
