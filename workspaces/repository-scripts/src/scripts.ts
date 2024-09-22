import { getCurrentGitRepositoryStatusPaths } from "@code-chronicles/util/getCurrentGitRepositoryStatusPaths";
import { isRunningInCI } from "@code-chronicles/util/isRunningInCI";
import { maybeThrow } from "@code-chronicles/util/maybeThrow";

type ScriptData = {
  run?: (mainAction: () => Promise<void>) => Promise<void>;
  repositoryRootCommand: readonly [string, readonly string[]];
};

export const SCRIPTS = {
  format: {
    async run(mainAction: () => Promise<void>): Promise<void> {
      if (!isRunningInCI()) {
        await mainAction();
        return;
      }

      const errors: unknown[] = await mainAction().then(
        () => [],
        (error) => [error],
      );

      try {
        let modifiedFileCount = 0;
        for await (const modifiedFile of getCurrentGitRepositoryStatusPaths()) {
          ++modifiedFileCount;

          // TODO: utility
          // Documentation: https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/workflow-commands-for-github-actions#setting-an-error-message
          console.log(
            `::error file=${modifiedFile},title=Formatting error::This file does not respect the repository's formatting rules.%0ARun \`yarn format\` in the repository root to auto-fix it.`,
          );

          // TODO: Also write up a job summary per https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary
        }

        if (modifiedFileCount > 0) {
          throw new Error(
            `${modifiedFileCount === 1 ? "1 file doesn't" : modifiedFileCount + " files don't"} respect the repository's formatting rules.`,
          );
        }
      } catch (error) {
        errors.push(error);
      }

      maybeThrow(errors);
    },

    repositoryRootCommand: ["prettier", ["--color", "--write", "."]],
  } as ScriptData,

  lint: {
    repositoryRootCommand: ["eslint", ["--color", "--max-warnings=0", "."]],
  } as ScriptData,

  test: null,

  typecheck: null,
} as const;

export type Script = keyof typeof SCRIPTS;

export function isScript(value: string): value is Script {
  return Object.hasOwn(SCRIPTS, value);
}

// TODO: maybe read this from the package.json of each workspace
export const SCRIPTS_TO_SKIP_BY_WORKSPACE: Readonly<
  Record<string, ReadonlySet<Script>>
> = {
  "chrome-extension-hello-world": new Set(["test"]),
  "download-leetcode-submissions": new Set(["test"]),
  "eslint-config": new Set(["test", "typecheck"]),
  "fetch-leetcode-problem-list": new Set(["test"]),
  "fetch-recent-accepted-leetcode-submissions": new Set(["test"]),
  "generate-health-report": new Set(["test"]),
  "javascript-leetcode-month": new Set(["test"]),
  "leetcode-api": new Set(["test"]),
  "leetcode-zen-mode": new Set(["test"]),
  "post-leetcode-potd-to-discord": new Set(["test"]),
  "repository-scripts": new Set(["test"]),
};
