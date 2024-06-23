import nullthrows from "nullthrows";

import { SUBMISSION_STATUS_TO_ABBREVIATION } from "@code-chronicles/leetcode-api";
import { timestampToYearMonthDay } from "@code-chronicles/util";

import { LANGUAGE_TO_FILE_EXTENSION } from "./constants";
import type { TransformedSubmission } from "./transformSubmission";

export function getFilenameForSubmission({
  id,
  lang,
  timestamp,
  status_display,
}: TransformedSubmission): string {
  const extension =
    LANGUAGE_TO_FILE_EXTENSION[
      lang as keyof typeof LANGUAGE_TO_FILE_EXTENSION
    ] ?? "txt";
  const date = timestampToYearMonthDay(timestamp, "");
  const resultAbbreviation = nullthrows(
    SUBMISSION_STATUS_TO_ABBREVIATION[
      status_display as keyof typeof SUBMISSION_STATUS_TO_ABBREVIATION
    ],
  ).toLowerCase();

  return `${date}-${id}-${resultAbbreviation}.${extension}`;
}
