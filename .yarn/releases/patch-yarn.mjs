#!/usr/bin/env node

// Example usage:
//   ./patch-yarn.mjs < yarn-4.5.1.cjs > yarn-4.5.1-patched.cjs
//   chmod +x yarn-4.5.1-patched.cjs

import process from "node:process";

process.stdin.setEncoding("utf8");

const chunks = [];

process.stdin.on("data", (chunk) => {
  chunks.push(chunk);
});

process.stdin.on("end", () => {
  const source = chunks.join("");

  const versionMatch = source.match(
    /name:\s*"@yarnpkg\/cli",\s*version:\s*"([^"]+)"/,
  );
  if (!versionMatch) {
    console.error("Couldn't parse the Yarn version from the source.");
    process.exit(1);
  }

  const version = versionMatch[1];
  if (version.endsWith("-patched")) {
    console.error(
      `Found Yarn version ${version}, which is already marked as patched.`,
    );
    process.exit(1);
  }

  console.log(
    source
      // Prevents the deletion of the "private" field from `package.json`
      // files.
      .replaceAll(/\bdelete [^\.]+\.private\b/g, "true")

      // Patches the `yarn workspaces foreach` command to identify itself via
      // the environment.
      .replaceAll(
        /\bProcess started[^;]*;/g,
        (match) =>
          `${match}process.env.CODE_CHRONICLES_RUNNING_VIA_YARN_WORKSPACES_FOREACH="1";`,
      )

      // Updates the Yarn version to indicate that we patched it.
      .replaceAll(`"${version}"`, `"${version}-patched"`),
  );
});
