# @code-chronicles/post-potd

![Status of the GitHub Actions workflow that posts the LeetCode problem of the day to the Code Chronicles Discord](https://github.com/code-chronicles-code/leetcode-curriculum/actions/workflows/post-potd.yml/badge.svg)

Announce LeetCode's problem of the day in a Discord channel!

Powered by [`@code-chronicles/leetcode-api`](../leetcode-api/).

To use:

1. **Prepare the necessary secrets.** You will need a token from the Discord API and the ID of the Discord channel in which to post.

```sh
# The file name is scary so you don't accidentally leak the secrets:
cp secrets_TEMPLATE.json secrets_DO_NOT_COMMIT_OR_SHARE.json

# ...then modify the new file using your favorite editor, e.g.:
nano secrets_DO_NOT_COMMIT_OR_SHARE.json
```

2. **Run the script!** Assumes you've already installed dependencies, by running `yarn`.

```sh
# This command should work from any directory in the repository:
yarn workspace @code-chronicles/post-potd start

# Alternatively, make sure you're in the package's directory:
cd workspaces/post-potd
yarn start
```

3. (optional) **Schedule daily script runs.** See, for example, [the Github Actions workflow](../../.github/workflows/post-potd.yml) in this repository.

Example message:

> ✨ New LeetCode problem of the day: [1460. Make Two Arrays Equal by Reversing Subarrays](https://leetcode.com/problems/make-two-arrays-equal-by-reversing-subarrays/) ✨
> It's marked easy, so don't overthink it!

## Idempotence

The script records the date of the last problem it posted in a file named `data.json`. On subsequent runs, it checks this file, to avoid duplicate posts.

The script also checks that the problem date reported by the LeetCode API matches the system's UTC date. (So it will be important for your system's time to be at least somewhat accurate.)

## Development

Like the rest of the [Code Chronicles Leetcode ecosystem](../../), this package is structured as a Node module, using [classic Yarn](https://classic.yarnpkg.com/) as the package manager.

You can install dependencies by running `yarn`, either in this package's directory, or in the repository root. The usual `yarn format`, `yarn lint`, and `yarn typecheck` scripts are available to aid in development and occasionally to annoy.

See also the repository's general [development guide](../../DEVELOPMENT.md).
