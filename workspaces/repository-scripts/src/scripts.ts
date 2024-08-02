import { getCurrentGitRepositoryStatusPaths } from "@code-chronicles/util/getCurrentGitRepositoryStatusPaths";
import { isCi } from "@code-chronicles/util/isCi";
import { only } from "@code-chronicles/util/only";

type ScriptData = {
  run?: (mainAction: () => Promise<void>) => Promise<void>;
  repositoryRootCommand: readonly [string, readonly string[]];
};

export const SCRIPTS = {
  format: {
    async run(mainAction: () => Promise<void>): Promise<void> {
      if (!isCi()) {
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

      if (errors.length > 0) {
        // TODO: turn this into a utility, perhaps
        throw errors.length === 1 ? only(errors) : new AggregateError(errors);
      }
    },

    repositoryRootCommand: ["prettier", [" --color", "--write", "."]],
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
  "download-submissions": new Set(["test"]),
  "eslint-config": new Set(["test", "typecheck"]),
  "fetch-leetcode-problem-list": new Set(["test"]),
  "generate-health-report": new Set(["test"]),
  "get-recent-submissions": new Set(["test"]),
  "leetcode-api": new Set(["test"]),
  "post-potd": new Set(["test"]),
  "repository-scripts": new Set(["test"]),
  util: new Set(["test"]),
};
