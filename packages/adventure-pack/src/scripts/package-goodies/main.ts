import fsPromises from "node:fs/promises";
import path from "node:path";

import { readAllGoodies } from "./readAllGoodies";

async function main(): Promise<void> {
  const goodies = await readAllGoodies();

  await fsPromises.mkdir("dist", { recursive: true });
  await fsPromises.writeFile(
    path.join("dist", "goodies.json"),
    // TODO: pretty print if NODE_ENV is "development"
    JSON.stringify(goodies) + "\n",
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
