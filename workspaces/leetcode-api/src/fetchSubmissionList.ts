import { z } from "zod";

import { numericIdAsNumberZodType } from "@code-chronicles/util/numericIdAsNumberZodType";
import { numericIdAsStringZodType } from "@code-chronicles/util/numericIdAsStringZodType";

import { questionTitleSlugZodType } from "./zod-types/questionTitleSlugZodType.ts";

export const SUBMISSION_STATUS_TO_DISPLAY_TEXT: ReadonlyMap<number, string> =
  new Map([
    [10, "Accepted"],
    [11, "Wrong Answer"],
    [12, "Memory Limit Exceeded"],
    [13, "Output Limit Exceeded"],
    [14, "Time Limit Exceeded"],
    [15, "Runtime Error"],
    [16, "Internal Error"],
    [20, "Compile Error"],
  ]);

// TODO: generate from SubmissionStatusEnum in the GraphQL schema
export const SUBMISSION_STATUS_TO_ABBREVIATION = {
  Accepted: "AC",
  "Wrong Answer": "WA",
  "Memory Limit Exceeded": "MLE",
  "Output Limit Exceeded": "OLE",
  "Time Limit Exceeded": "TLE",
  "Runtime Error": "RE",
  "Internal Error": "IE",
  "Compile Error": "CE",
} as const;

const submissionZodType = (() => {
  const int = z.number().int();
  const trimmedNonEmptyString = z.string().trim().min(1);
  const untrimmedNonEmptyString = z.string().min(1);

  return z
    .object({
      id: numericIdAsStringZodType,
      // eslint-disable-next-line camelcase
      question_id: numericIdAsNumberZodType,
      lang: trimmedNonEmptyString,
      // eslint-disable-next-line camelcase
      lang_name: trimmedNonEmptyString,
      time: trimmedNonEmptyString.transform((s) => s.replace(/\u00a0/g, " ")),
      timestamp: int.nonnegative(),
      status: int,
      // eslint-disable-next-line camelcase
      status_display: trimmedNonEmptyString,
      runtime: trimmedNonEmptyString,
      url: z
        .string()
        .min(1)
        .transform((value) =>
          new URL(value, "https://leetcode.com/").toString(),
        ),
      // eslint-disable-next-line camelcase
      is_pending: trimmedNonEmptyString,
      title: trimmedNonEmptyString,
      memory: trimmedNonEmptyString,
      code: untrimmedNonEmptyString,
      // eslint-disable-next-line camelcase
      compare_result: z
        .string()
        .regex(/^[01]*$/)
        .transform((value) => Array.from(value).map((c) => c === "1"))
        .nullable(),
      // eslint-disable-next-line camelcase
      title_slug: questionTitleSlugZodType,
      // eslint-disable-next-line camelcase
      has_notes: z.boolean(),
      // eslint-disable-next-line camelcase
      flag_type: int,
    })
    .transform(
      ({
        // eslint-disable-next-line camelcase
        question_id,
        title,
        // eslint-disable-next-line camelcase
        title_slug,
        ...rest
      }) => ({
        ...rest,
        question: {
          // eslint-disable-next-line camelcase
          questionFrontendId: question_id,
          title,
          // eslint-disable-next-line camelcase
          titleSlug: title_slug,
        },
      }),
    );
})();

export type Submission = z.infer<typeof submissionZodType>;

const submissionListZodType = z.object({
  // eslint-disable-next-line camelcase
  submissions_dump: z.array(submissionZodType),
  // eslint-disable-next-line camelcase
  has_next: z.boolean(),
  // eslint-disable-next-line camelcase
  last_key: z.string(),
});

export type SubmissionList = z.infer<typeof submissionListZodType>;

export const PAGE_SIZE = 20;

export async function fetchSubmissionList({
  // Note: Even if you specify a higher limit it seems LeetCode caps this to the page size.
  limit = PAGE_SIZE,
  page = 0,
  session,
}: {
  limit?: number;
  page?: number;
  session: string;
}): Promise<SubmissionList> {
  const url = new URL("https://leetcode.com/api/submissions/");
  url.search = new URLSearchParams({
    offset: String(page * PAGE_SIZE),
    limit: String(limit),
  }).toString();

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Accept-Language": "*",
      Cookie: `LEETCODE_SESSION=${session}`,
    },
  });

  // TODO: utility for `fetch` with checking response
  if (!response.ok) {
    throw new Error(`Got status ${response.status} from server!`);
  }

  return submissionListZodType.parse(await response.json());
}
