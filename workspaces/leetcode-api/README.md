# @code-chronicles/leetcode-api

Read data from the LeetCode API in TypeScript!

Example usage:

```ts
import { getActiveDailyCodingChallengeQuestionWithDateValidation as getPotd } from "@code-chronicles/leetcode-api";

const potd = await getPotd();
console.log(potd);
```

Used to power sibling packages like:

- [`@code-chronicles/download-submissions`](../download-submissions/), which downloads the logged-in user's LeetCode submissions
- [`@code-chronicles/fetch-leetcode-problem-list`](../fetch-leetcode-problem-list/), which fetches the metadata of all LeetCode problems
- [`@code-chronicles/post-potd`](../post-potd/), which queries LeetCode's problem of the day and posts about it in a Discord channel

## Development

Like the rest of the [Code Chronicles Leetcode ecosystem](../../), this package is structured as a Node module, using [classic Yarn](https://classic.yarnpkg.com/) as the package manager.

You can install dependencies by running `yarn`, either in this package's directory, or in the repository root. The usual `yarn format`, `yarn lint`, and `yarn typecheck` scripts are available to aid in development and occasionally to annoy.

See also the repository's general [development guide](../../DEVELOPMENT.md).
