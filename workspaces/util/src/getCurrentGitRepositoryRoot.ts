import invariant from "invariant";

import { execWithArgsOrThrowOnNzec } from "@code-chronicles/util/execWithArgsOrThrowOnNzec";

export async function getCurrentGitRepositoryRoot(): Promise<string> {
  const gitCommandResult = await execWithArgsOrThrowOnNzec("git", [
    "rev-parse",
    "--show-toplevel",
  ]);

  const repositoryRoot = gitCommandResult.stdout.trim();
  invariant(repositoryRoot.length > 0, "Expected non-empty repository root!");
  return repositoryRoot;
}
