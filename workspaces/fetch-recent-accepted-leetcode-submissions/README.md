# @code-chronicles/fetch-recent-accepted-leetcode-submissions

Fetch recent accepted submissions from the public profiles of the specified users.

Powered by [`@code-chronicles/leetcode-api`](../leetcode-api/).

To use, run the script with the usernames of interest. For example, to get the recent accepted submissions of users [elimanzo](https://leetcode.com/u/elimanzo/) and [VehicleOfPuzzle](https://leetcode.com/u/VehicleOfPuzzle/):

```sh
# Install dependencies, if you haven't already:
yarn

# This command should work from any directory in the repository:
yarn workspace @code-chronicles/fetch-recent-accepted-leetcode-submissions elimanzo VehicleOfPuzzle

# Alternatively, make sure you're in the package's directory:
cd workspaces/fetch-recent-accepted-leetcode-submissions
yarn start elimanzo VehicleOfPuzzle
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

Redirect it to a file for later consumption, and use `--silent` to skip any output from Yarn itself:

```sh
yarn --silent start elimanzo VehicleOfPuzzle > data.json
```

## Development

Like the rest of the [Code Chronicles Leetcode ecosystem](../../), this package is structured as a Node module, using [classic Yarn](https://classic.yarnpkg.com/) as the package manager.

You can install dependencies by running `yarn`, either in this package's directory, or in the repository root. The usual `yarn format`, `yarn lint`, and `yarn typecheck` scripts are available to aid in development and occasionally to annoy.

See also the repository's general [development guide](../../DEVELOPMENT.md).
