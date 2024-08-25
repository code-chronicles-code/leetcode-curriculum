import { copyFile } from "node:fs/promises";
import path from "node:path";

import { WEBAPP_DIST } from "./constants";

export async function writeStyleCss(): Promise<void> {
  await copyFile(
    path.join("css", "style.css"),
    path.join(WEBAPP_DIST, "style.css"),
  );
}
