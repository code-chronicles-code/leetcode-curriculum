# @code-chronicles/post-leetcode-potd-to-discord

[![Status of the GitHub Actions workflow that posts the LeetCode problem of the day to the Code Chronicles Discord](https://github.com/code-chronicles-code/leetcode-curriculum/actions/workflows/post-leetcode-potd-to-discord.yml/badge.svg)](https://github.com/code-chronicles-code/leetcode-curriculum/actions/workflows/post-leetcode-potd-to-discord.yml)

Announce LeetCode's problem of the day in a Discord channel!

Powered by [`@code-chronicles/leetcode-api`](../leetcode-api/).

To use:

1. **Prepare the necessary secrets.** You will need a token from the Discord API and the ID of the Discord channel in which to post.

   ```sh
   # Navigate to the package's directory:
   cd workspaces/post-leetcode-potd-to-discord

   # The file name is scary so you don't accidentally leak the secrets:
   cp secrets_TEMPLATE.json secrets_DO_NOT_COMMIT_OR_SHARE.json

   # ...then modify the new file using your favorite editor, e.g.:
   nano secrets_DO_NOT_COMMIT_OR_SHARE.json
   ```

2. **Run the script!** You can run a development version:

   ```sh
   # Install dependencies, if you haven't already:
   yarn

   # This command should work from any directory in the repository:
   yarn workspace @code-chronicles/post-leetcode-potd-to-discord start

   # Alternatively, make sure you're in the package's directory:
   cd workspaces/post-leetcode-potd-to-discord
   yarn start
   ```

   Or, build and run a distribution version:

   ```sh
   # It's easiest to do this from the package's directory:
   cd workspaces/post-leetcode-potd-to-discord

   # Install dependencies, if you haven't already:
   yarn

   # Package the script into an executable:
   yarn build

   # Run it with Node!
   node dist/post-leetcode-potd-to-discord.cjs

   # Or if your system can handle executable files, try running it directly:
   ./dist/post-leetcode-potd-to-discord.cjs
   ```

   Here's an example message:

   <!-- prettier-ignore-start -->
   <!-- The two spaces at the end of the next line are intentional and necessary for rendering a single line break. -->

   > ✨ New LeetCode problem of the day: [1460. Make Two Arrays Equal by Reversing Subarrays](https://leetcode.com/problems/make-two-arrays-equal-by-reversing-subarrays/) (marked Easy) ✨
   >
   > ##### Problem due: ⏳ in 20 hours ⏳

   Note that the "in 20 hours" is a [Discord relative timestamp](https://discord.com/developers/docs/reference#message-formatting-timestamp-styles) so it will remain up-to-date as time passes.

   <!-- prettier-ignore-end -->

3. (optional) **Schedule daily script runs.** See, for example, [the Github Actions workflow](../../.github/workflows/post-leetcode-potd-to-discord.yml) in this repository.

## Idempotence

The script records the date of the last problem it posted in a file named `data.json`. On subsequent runs, it checks this file, to avoid duplicate posts.

The script also checks that the problem date reported by the LeetCode API matches the system's UTC date. (So it will be important for your system's time to be at least somewhat accurate.)

## Development

Like the rest of the [Code Chronicles Leetcode ecosystem](../../), this package is structured as a Node module, using [Yarn](https://yarnpkg.com/) as the package manager.

You can install dependencies by running `yarn`, either in this package's directory, or in the repository root. The usual `yarn format`, `yarn lint`, and `yarn typecheck` scripts are available to aid in development and occasionally to annoy. Read more in the repository's general [development guide](../../DEVELOPMENT.md).

This package supports an additional `package.json` script:

### `yarn build`

Builds a distribution version of this package, in a `dist` directory within the package's workspace.
