import process from "node:process";

export function isRunningInGitHubActions(): boolean {
  // Per https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/variables#default-environment-variables
  return process.env.GITHUB_ACTIONS === "true";
}
