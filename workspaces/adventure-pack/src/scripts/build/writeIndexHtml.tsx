import { exec as execWithCallback } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import React from "react";
import ReactDOMServer from "react-dom/server";

import { App } from "../../app/components/App.tsx";
import { WEB_APP_DIST } from "./constants.ts";

const exec = promisify(execWithCallback);

// TODO: Investigate why this script works with `tsx` but not `ts-node`.

export async function writeIndexHtml(): Promise<void> {
  const commitHash = (await exec("git rev-parse HEAD")).stdout.trim();

  await writeFile(
    path.join(WEB_APP_DIST, "index.html"),
    "<!DOCTYPE html>\n" +
      ReactDOMServer.renderToStaticMarkup(
        <html lang="en-US">
          <head>
            <meta charSet="utf-8" />
            <title>Adventure Pack</title>
            <link
              rel="preconnect"
              href="https://fonts.googleapis.com"
              crossOrigin=""
            />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin=""
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Courgette&display=swap"
              rel="stylesheet"
            />
            <script async src="main.js" />
            <script async src="dependencies.js" />
            <link href="style.css" rel="stylesheet" />
          </head>
          <body>
            <div id="main">
              <App commitHash={commitHash} />
            </div>
          </body>
        </html>,
      ) +
      "\n",
    { encoding: "utf8" },
  );
}
