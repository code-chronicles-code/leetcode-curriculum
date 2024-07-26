import invariant from "invariant";

import { execWithArgs } from "@code-chronicles/util/execWithArgs";

export async function getCurrentGitRepositoryRoot(): Promise<string> {
  const result = await execWithArgs("git", ["rev-parse", "--show-toplevel"]);

  if (result.exitCode !== 0) {
    throw new Error(result.stderr.trim() || "Non-zero exit code!");
  }

  const repositoryRoot = result.stdout.trim();
  invariant(repositoryRoot.length > 0, "Expected non-empty repository root!");
  return repositoryRoot;
}
