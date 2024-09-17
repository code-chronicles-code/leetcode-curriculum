import process from "node:process";

import { runCommands } from "./runCommands.js";
import { SCRIPTS, isScript } from "./scripts.js";

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
  const actionWrapper = SCRIPTS[script]?.run;

  await (actionWrapper ? actionWrapper(action) : action());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
