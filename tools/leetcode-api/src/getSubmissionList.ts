import { z } from "zod";

const submissionParser = (() => {
  const int = z.number().int();
  const positiveInt = int.positive();
  const trimmedNonEmptyString = z.string().trim().min(1);
  const untrimmedNonEmptyString = z.string().min(1);

  return z
    .object({
      id: positiveInt.transform(String),
      question_id: positiveInt,
      lang: trimmedNonEmptyString,
      lang_name: trimmedNonEmptyString,
      time: trimmedNonEmptyString.transform((s) => s.replace(/\u00a0/g, " ")),
      timestamp: int.nonnegative(),
      status: int,
      status_display: trimmedNonEmptyString,
      runtime: trimmedNonEmptyString,
      url: z
        .string()
        .min(1)
        .transform((value) =>
          new URL(value, "https://leetcode.com/").toString(),
        ),
      is_pending: trimmedNonEmptyString,
      title: trimmedNonEmptyString,
      memory: trimmedNonEmptyString,
      code: untrimmedNonEmptyString,
      compare_result: z
        .string()
        .regex(/^[01]*$/)
        .transform((value) => Array.from(value).map((c) => c === "1"))
        .nullable(),
      title_slug: z
        .string()
        .trim()
        .regex(/^[a-z0-9\-]+$/),
      has_notes: z.boolean(),
      flag_type: int,
    })
    .transform(({ question_id, title, title_slug, ...rest }) => ({
      ...rest,
      question: { title, titleSlug: title_slug, problemNumber: question_id },
    }));
})();

export type Submission = z.infer<typeof submissionParser>;

const submissionListParser = z.object({
  submissions_dump: z.array(submissionParser),
  has_next: z.boolean(),
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
    console.log(await response.text());
    throw new Error(`Got status ${response.status} from server!`);
  }

  return submissionListParser.parse(await response.json());
}
