import nullthrows from "nullthrows";

import { execWithArgsOrThrowOnNzec } from "@code-chronicles/util/execWithArgsOrThrowOnNzec";
import { getLines } from "@code-chronicles/util/getLines";

export async function* getCurrentGitRepositoryStatusPaths(): AsyncGenerator<
  string,
  void,
  void
> {
  const gitCommandResult = await execWithArgsOrThrowOnNzec("git", [
    "status",
    "--porcelain",
  ]);

  // Using a set to deduplicate, in case multiple files were "moved from" the
  // same file. I'm not even completely sure if that's possible, but no harm in
  // defending against it.
  const yieldedPaths = new Set();

  for (const line of getLines(gitCommandResult.stdout)) {
    // See: https://git-scm.com/docs/git-status#_porcelain_format_version_1
    const [, pathString] = nullthrows(line.match(/^.. \b(.*)\b\s*$/));

    for (const path of pathString.split(" -> ", 2)) {
      if (yieldedPaths.has(path)) {
        continue;
      }

      yield path;
      yieldedPaths.add(path);
    }
  }
}
