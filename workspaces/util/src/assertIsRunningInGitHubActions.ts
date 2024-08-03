import invariant from "invariant";

import { isRunningInGitHubActions } from "@code-chronicles/util/isRunningInGitHubActions";

export function assertIsRunningInGitHubActions(): void {
  invariant(
    isRunningInGitHubActions(),
    "Expected to be running in a GitHub Actions environment!",
  );
}
