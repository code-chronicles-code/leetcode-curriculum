import invariant from "invariant";

import { execWithArgs } from "@code-chronicles/util/execWithArgs";

export async function getCurrentGitRepositoryRoot(): Promise<string> {
  const gitCommandResult = await execWithArgs("git", [
    "rev-parse",
    "--show-toplevel",
  ]);

  if (gitCommandResult.exitCode !== 0) {
    throw new Error(gitCommandResult.stderr.trim() || "Non-zero exit code!");
  }

  const repositoryRoot = gitCommandResult.stdout.trim();
  invariant(repositoryRoot.length > 0, "Expected non-empty repository root!");
  return repositoryRoot;
}
