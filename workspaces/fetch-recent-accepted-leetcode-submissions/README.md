# @code-chronicles/fetch-recent-accepted-leetcode-submissions

Fetch recent accepted submissions from the public profiles of the specified users.

Powered by [`@code-chronicles/leetcode-api`](../leetcode-api/).

To use, run the script with the usernames of interest. For example, to get the recent accepted submissions of users [elimanzo](https://leetcode.com/u/elimanzo/) and [VehicleOfPuzzle](https://leetcode.com/u/VehicleOfPuzzle/), using the development version:

```sh
# Install dependencies, if you haven't already:
yarn

# This command should work from any directory in the repository:
yarn workspace @code-chronicles/fetch-recent-accepted-leetcode-submissions elimanzo VehicleOfPuzzle

# Alternatively, make sure you're in the package's directory:
cd workspaces/fetch-recent-accepted-leetcode-submissions
yarn start elimanzo VehicleOfPuzzle
```

Or, by building and running a distribution version:

```sh
# It's easiest to do this from the package's directory:
cd workspaces/fetch-recent-accepted-leetcode-submissions

# Install dependencies, if you haven't already:
yarn

# Package the script into an executable:
yarn build

# Run it with Node!
node dist/fetch-recent-accepted-leetcode-submissions.js elimanzo VehicleOfPuzzle

# Or if your system can handle executable files, try running it directly:
./dist/fetch-recent-accepted-leetcode-submissions.js elimanzo VehicleOfPuzzle
```

The output is JSON and will look something like:

```json
{
  "elimanzo": [
    {
      "id": "1350347480",
      "title": "Magic Squares In Grid",
      "titleSlug": "magic-squares-in-grid",
      "timestamp": 1723232240
    }
    // ...
  ],
  "VehicleOfPuzzle": [
    {
      "id": "1350479953",
      "title": "Regions Cut By Slashes",
      "titleSlug": "regions-cut-by-slashes",
      "timestamp": 1723248082
    }
    // ...
  ]
}
```

You can redirect it to a file for later consumption:

```sh
yarn start elimanzo VehicleOfPuzzle > data.json
```

## Development

Like the rest of the [Code Chronicles Leetcode ecosystem](../../), this package is structured as a Node module, using [Yarn](https://yarnpkg.com/) as the package manager.

You can install dependencies by running `yarn`, either in this package's directory, or in the repository root. The usual `yarn format`, `yarn lint`, and `yarn typecheck` scripts are available to aid in development and occasionally to annoy. Read more in the repository's general [development guide](../../DEVELOPMENT.md).

This package supports an additional `package.json` script:

### `yarn build`

Builds a distribution version of this package, in a `dist` directory within the package's workspace.
