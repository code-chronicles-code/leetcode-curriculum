import { z } from "zod";

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

const submissionParser = (() => {
  const int = z.number().int();
  const positiveInt = int.positive();
  const trimmedNonEmptyString = z.string().trim().min(1);
  const untrimmedNonEmptyString = z.string().min(1);

  return z
    .object({
      id: positiveInt.transform(String),
      // eslint-disable-next-line camelcase
      question_id: positiveInt,
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
      title_slug: z
        .string()
        .trim()
        .regex(/^[a-z0-9\-]+$/),
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

export type Submission = z.infer<typeof submissionParser>;

const submissionListParser = z.object({
  // eslint-disable-next-line camelcase
  submissions_dump: z.array(submissionParser),
  // eslint-disable-next-line camelcase
  has_next: z.boolean(),
  // eslint-disable-next-line camelcase
  last_key: z.string(),
});

export type SubmissionList = z.infer<typeof submissionListParser>;

const PAGE_SIZE = 20;

export async function getSubmissionList({
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

  if (!response.ok) {
    throw new Error(`Got status ${response.status} from server!`);
  }

  return submissionListParser.parse(await response.json());
}
