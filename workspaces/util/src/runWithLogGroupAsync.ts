import { isRunningInGitHubActions } from "@code-chronicles/util/isRunningInGitHubActions";

export async function runWithLogGroupAsync(
  message: string,
  action: () => Promise<void>,
): Promise<void> {
  // Per https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/workflow-commands-for-github-actions#grouping-log-lines
  console.error(isRunningInGitHubActions() ? "::group::" + message : message);

  try {
    await action();
  } finally {
    isRunningInGitHubActions() && console.error("::endgroup::");
  }
}
