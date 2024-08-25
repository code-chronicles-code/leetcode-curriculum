import { copyFile } from "node:fs/promises";
import path from "node:path";

import { WEB_APP_DIST } from "./constants";

export async function writeStyleCss(): Promise<void> {
  await copyFile(
    path.join("css", "style.css"),
    path.join(WEB_APP_DIST, "style.css"),
  );
}
