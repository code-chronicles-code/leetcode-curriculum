import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { CHROME_EXTENSION_DIST } from "./constants";

async function main(): Promise<void> {
  await mkdir(CHROME_EXTENSION_DIST, { recursive: true });

  await writeFile(
    path.join(CHROME_EXTENSION_DIST, "manifest.json"),
    JSON.stringify(
      {
        name: "Adventure Pack",
        // TODO: get a nice description from the package.json perhaps
        description: "TODO: add a nice description",
        // TODO: get a version from the package.json perhaps
        version: "0.0.1",

        // eslint-disable-next-line camelcase
        manifest_version: 3,
        // eslint-disable-next-line camelcase
        side_panel: {
          // eslint-disable-next-line camelcase
          default_path: "index.html",
        },
        permissions: ["sidePanel"],
      },
      null,
      2,
    ) + "\n",
    { encoding: "utf8" },
  );

  await writeFile(
    path.join(CHROME_EXTENSION_DIST, "index.html"),
    `
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <title>Adventure Pack</title>
  </head>
  <body>
    <div id="main">Hello World!</div>
  </body>
</html>
    `,
    { encoding: "utf8" },
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
