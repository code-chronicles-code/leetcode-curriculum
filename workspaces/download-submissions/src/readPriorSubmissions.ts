import fsPromises from "node:fs/promises";

import { getLines } from "@code-chronicles/util/getLines";

import { METADATA_FILE } from "./constants";
import type { TransformedSubmission } from "./transformSubmission";

export async function readPriorSubmissions(): Promise<
  Map<string, TransformedSubmission>
> {
  const data = await fsPromises.readFile(METADATA_FILE, "utf8").catch((e) => {
    if (e.code === "ENOENT") {
      return "";
    }
    throw e;
  });

  const map = new Map<string, TransformedSubmission>();
  for (const line of getLines(data)) {
    // TODO: maybe validate
    const submission = JSON.parse(line) as TransformedSubmission;
    map.set(submission.id, submission);
  }

  return map;
}
