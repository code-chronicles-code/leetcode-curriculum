import { Chalk } from "chalk";

import { COLOR_LEVEL } from "./chalkLevelOrForced.ts";

const chalk = new Chalk({ level: COLOR_LEVEL });

export function reportCommand(command: string, args: readonly string[]): void {
  console.warn(
    chalk.blue("\u276F ") +
      chalk.grey([command, ...args].map(shellEscape).join(" ")),
  );
}

// Port of https://github.com/ruby/shellwords/blob/d1a2605dfe078ef603f788fdaf146941bfbd0d77/lib/shellwords.rb#L147
function shellEscape(s: string): string {
  if (s.length === 0) {
    return "''";
  }

  return s
    .replaceAll(/[^A-Za-z0-9_\-.,:+\/@\n]/g, (match) => `\\${match}`)
    .replaceAll(/\n/g, "'\n'");
}
