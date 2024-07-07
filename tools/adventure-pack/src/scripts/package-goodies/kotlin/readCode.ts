import fsPromises from "node:fs/promises";
import path from "node:path";

import { GOODIES_DIRECTORY } from "./constants";

export async function readCode(packageName: string): Promise<string> {
  return await fsPromises.readFile(
    path.join(GOODIES_DIRECTORY, packageName, "Main.kt"),
    "utf8",
  );
}
