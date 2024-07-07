import fsPromises from "node:fs/promises";
import path from "node:path";

import { sortObjectKeys } from "@code-chronicles/util";

import type { GoodiesByLanguage } from "../../app/fetchGoodies";
import { readGoodies as readJavaGoodies } from "./java/readGoodies";
import { readGoodies as readKotlinGoodies } from "./kotlin/readGoodies";
import { readGoodies as readPythonGoodies } from "./python3/readGoodies";
import { readGoodies as readTypeScriptAndJavaScriptGoodies } from "./typescript/readGoodies";

async function main(): Promise<void> {
  const goodies: GoodiesByLanguage = {
    java: await readJavaGoodies(),
    kotlin: await readKotlinGoodies(),
    python3: await readPythonGoodies(),
    ...(await readTypeScriptAndJavaScriptGoodies()),
  };

  await fsPromises.mkdir("dist", { recursive: true });
  await fsPromises.writeFile(
    path.join("dist", "goodies.json"),
    JSON.stringify(sortObjectKeys(goodies)) + "\n",
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
