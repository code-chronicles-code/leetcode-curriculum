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
      time: trimmedNonEmptyString,
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
        .transform((value) => Array.from(value).map((c) => c === "1")),
      title_slug: z
        .string()
        .trim()
        .regex(/^[a-z0-9\-]+$/),
      has_notes: z.boolean(),
      flag_type: int,
    })
    .transform(({ question_id, title, title_slug, ...rest }) => ({
      ...rest,
      question: {
        questionFrontendId: question_id,
        title,
        titleSlug: title_slug,
      },
    }));
})();

export type Submission = z.infer<typeof submissionParser>;

const submissionListParser = z.object({
  submissions_dump: z.array(submissionParser),
  has_next: z.boolean(),
  last_key: z.string(),
});

export type SubmissionList = z.infer<typeof submissionListParser>;

export async function getSubmissionList({
  limit = 50,
  offset = 0,
  session,
}: {
  limit: number;
  offset: number;
  session: string;
}): Promise<SubmissionList> {
  const url = new URL("https://leetcode.com/api/submissions/");
  url.search = new URLSearchParams({
    offset: String(offset),
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
