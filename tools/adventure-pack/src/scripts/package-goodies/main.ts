import fsPromises from "node:fs/promises";
import path from "node:path";

import type { Goody } from "../../app/goodyParser";
import type { Language } from "../../app/languageParser";
import { readGoodies as readJavaGoodies } from "./java/readGoodies";
import { readGoodies as readPythonGoodies } from "./python/readGoodies";
import { readGoodies as readTypeScriptAndJavaScriptGoodies } from "./typescript/readGoodies";

async function main(): Promise<void> {
  const goodies: Record<Language, Record<string, Goody>> = {
    java: await readJavaGoodies(),
    python3: await readPythonGoodies(),
    ...(await readTypeScriptAndJavaScriptGoodies()),
  };

  await fsPromises.mkdir("dist", { recursive: true });
  await fsPromises.writeFile(
    path.join("dist", "goodies.json"),
    JSON.stringify(goodies) + "\n",
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
