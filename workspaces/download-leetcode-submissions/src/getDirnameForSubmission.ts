import path from "node:path";

import type { TransformedSubmission } from "./transformSubmission.ts";

const PROBLEMS_PER_GROUP = 100;

function padProblemNumber(n: number): string {
  return `${n}`.padStart(4, "0");
}

export function getDirnameForSubmission(
  submission: TransformedSubmission,
): string {
  const { questionFrontendId, titleSlug } = submission.question;
  const start =
    questionFrontendId - (questionFrontendId % PROBLEMS_PER_GROUP) + 1;
  const end = start - 1 + PROBLEMS_PER_GROUP;

  return path.join(
    "submissions",
    `${padProblemNumber(start)}-${padProblemNumber(end)}`,
    `${padProblemNumber(questionFrontendId)}-${titleSlug}`,
  );
}
