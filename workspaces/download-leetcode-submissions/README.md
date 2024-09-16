# @code-chronicles/download-leetcode-submissions

Download the logged-in user's LeetCode submissions!

Powered by [`@code-chronicles/leetcode-api`](../leetcode-api/).

To use:

1. **Prepare the necessary secrets.** Specifically, you will need a LeetCode session cookie.

   ```sh
   # Navigate to the package's directory:
   cd workspaces/download-leetcode-submissions

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
   yarn workspace @code-chronicles/download-leetcode-submissions

   # Alternatively, make sure you're in the package's directory:
   cd workspaces/download-leetcode-submissions
   yarn start
   ```

   Or, build and run a distribution version:

   ```sh
   # It's easiest to do this from the package's directory:
   cd workspaces/download-leetcode-submissions

   # Install dependencies, if you haven't already:
   yarn

   # Package the script into an executable:
   yarn build

   # Run it with Node!
   node dist/download-leetcode-submissions.cjs

   # Or if your system can handle executable files, try running it directly:
   ./dist/download-leetcode-submissions.cjs
   ```

   Submissions will be downloaded to a directory named `submissions`, grouped by problem and problem number range. Filenames take the form `{yyyymmdd-date}-{submission-id}-{result}.{extension}`, resulting in full paths like `submissions/2101-2200/2163-kth-distinct-string-in-an-array/20240805-1345920313-ac.c` for an accepted C solution submitted on August 5th, 2024.

## Metadata Files

In addition to the submissions themselves, the script outputs two metadata files, `submissions.jsonl` and `submissions.sha512`.

The `submissions.jsonl` file is in [JSON Lines](https://jsonlines.org/) format, so each line is a JSON description of one submission, for example:

<!-- prettier-ignore-start -->
```json
{"id":"1345920313","lang":"c","lang_name":"C","timestamp":1722897694,"status":10,"status_display":"Accepted","runtime":"12 ms","url":"https://leetcode.com/submissions/detail/1345920313/","is_pending":"Not Pending","memory":"79.4 MB","has_notes":false,"flag_type":1,"question":{"questionFrontendId":2163,"title":"Kth Distinct String in an Array","titleSlug":"kth-distinct-string-in-an-array"},"sha512":"6453a1e7a9314a1239770c7c77c3a7f6ccefadc446e42beec699b6be52b81399e2d79a4523ac30edd7beabaa6fae108ebd6361fdf6361cabadc1b7f844b82150","compare_result":"111111111111111111111111111111111111111111111111111111111111111111"}
```
<!-- prettier-ignore-end -->

The `submissions.sha512` file lists the submission filenames and their [SHA-512](https://en.wikipedia.org/wiki/SHA-2) digests. Its lines look like:

```hashes
6453a1e7a9314a1239770c7c77c3a7f6ccefadc446e42beec699b6be52b81399e2d79a4523ac30edd7beabaa6fae108ebd6361fdf6361cabadc1b7f844b82150  submissions/2101-2200/2163-kth-distinct-string-in-an-array/20240805-1345920313-ac.c
```

It can be used to check the integrity of the submissions:

```sh
shasum -c submissions.sha512
```

Or to identify duplicates among the submissions:

```sh
cut -d ' ' -f 1 submissions.sha512 | sort | uniq -c | awk '$1 > 1'
```

## Multiple Runs / Resuming After Failures

The script aims to gracefully handle being run multiple times, whether it's because of a failure or because we want to keep the downloaded submissions up-to-date.

To do so, we rely on the `submissions.jsonl` metadata file to mark download progress. To avoid missing submissions, we maintain as an invariant that this file will be a chronologically consecutive sequence of submissions.

On each run, the script downloads submissions starting with the latest. So it will first download any submissions that are more recent than the latest ones listed in `submissions.jsonl`; once it reaches the range of submissions recorded in `submissions.jsonl` it will skip past them to avoid duplicating work; then it will download any submissions that are older than the ones from `submissions.jsonl`, until we reach the final page of submissions.

As such it's safe to run the script multiple times, without redoing too much work between runs.

## Development

Like the rest of the [Code Chronicles Leetcode ecosystem](../../), this package is structured as a Node module, using [Yarn](https://yarnpkg.com/) as the package manager.

You can install dependencies by running `yarn`, either in this package's directory, or in the repository root. The usual `yarn format`, `yarn lint`, and `yarn typecheck` scripts are available to aid in development and occasionally to annoy. Read more in the repository's general [development guide](../../DEVELOPMENT.md).

This package supports an additional `package.json` script:

### `yarn build`

Builds a distribution version of this package, in a `dist` directory within the package's workspace.
