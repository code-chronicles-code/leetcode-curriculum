import { readFile } from "node:fs/promises";
import process from "node:process";

import { processWriteUpForLeetCode } from "./processWriteUpForLeetCode.js";

async function main(): Promise<void> {
  const [, , file] = process.argv as (string | undefined)[];
  if (file == null) {
    throw new Error("Please specify a file to prep!");
  }

  const originalMarkdown = await readFile(file, "utf8");
  const updatedMarkdown = await processWriteUpForLeetCode(originalMarkdown);
  console.log(updatedMarkdown.replace(/\n$/, ""));
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
