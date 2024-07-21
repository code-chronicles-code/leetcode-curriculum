import fsPromises from "node:fs/promises";
import path from "node:path";

import { GOODIES_DIRECTORY } from "./constants";

export function readCode(moduleName: string): Promise<string> {
  return fsPromises.readFile(
    path.join(GOODIES_DIRECTORY, moduleName, "__init__.py"),
    "utf8",
  );
}
