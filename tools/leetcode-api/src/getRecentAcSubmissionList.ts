import { z } from "zod";

import { getGraphQLData } from "./getGraphQLData";
import { questionTitleSlugParser } from "./parsers/questionTitleSlugParser";

const QUERY = `
  query ($username: String!, $limit: Int!) {
    recentAcSubmissionList(username: $username, limit: $limit) {
      id
      title
      titleSlug
      timestamp
    }
  }
`
  .trim()
  .replace(/\s+/g, " ");

const submissionParser = z.object({
  id: z
    .string()
    .trim()
    .regex(/^[1-9][0-9]*$/),
  title: z.string().trim().min(1),
  titleSlug: questionTitleSlugParser,
  timestamp: z
    .string()
    .trim()
    .regex(/^[1-9][0-9]*$/)
    .transform((value) => parseInt(value, 10)),
});

export type RecentAcSubmission = z.infer<typeof submissionParser>;

const recentAcSubmissionListParser = z
  .object({
    recentAcSubmissionList: z.array(submissionParser),
  })
  .transform((data) => data.recentAcSubmissionList);

export async function getRecentAcSubmissionList({
  limit = 50,
  username,
}: {
  limit?: number;
  username: string;
}): Promise<RecentAcSubmission[]> {
  const { data } = await getGraphQLData(QUERY, { username, limit });
  return recentAcSubmissionListParser.parse(data);
}
