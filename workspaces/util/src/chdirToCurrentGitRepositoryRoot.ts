import process from "node:process";

import { getCurrentGitRepositoryRoot } from "@code-chronicles/util/getCurrentGitRepositoryRoot";

export async function chdirToCurrentGitRepositoryRoot(): Promise<void> {
  process.chdir(await getCurrentGitRepositoryRoot());
}
