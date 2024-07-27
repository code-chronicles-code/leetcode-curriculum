import type { IterableElement } from "type-fest";

function readonlySet<T extends string>(...values: T[]): ReadonlySet<T> {
  return new Set(values);
}

export const SCRIPTS = readonlySet("format", "lint", "test", "typecheck");

export type Script = IterableElement<typeof SCRIPTS>;

export function isScript(value: string): value is Script {
  return SCRIPTS.has(value as Script);
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

export const REPOSITORY_ROOT_COMMANDS: Readonly<
  Record<Script, readonly [string, readonly string[]] | null>
> = {
  format: ["prettier", [" --color", "--write", "."]],
  lint: ["eslint", ["--color", "--max-warnings=0", "."]],
  test: null,
  typecheck: null,
};
