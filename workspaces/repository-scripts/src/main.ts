import process from "node:process";

import { identity } from "@code-chronicles/util/identity";

import { runCommands } from "./runCommands";
import { SCRIPTS, isScript } from "./scripts";

async function main() {
  if (process.argv.length < 3) {
    throw new Error(
      "Please specify the script to run, one of: " +
        Object.keys(SCRIPTS).join(", "),
    );
  }

  const [script, ...scriptArgs] = process.argv.slice(2);
  if (!isScript(script)) {
    throw new Error(`Invalid script: ${script}`);
  }

  const action = async () => await runCommands(script, scriptArgs);
  const actionWrapper = SCRIPTS[script]?.run ?? identity;

  await actionWrapper(action);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
