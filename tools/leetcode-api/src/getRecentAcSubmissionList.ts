import { z } from "zod";

import { getGraphQLData } from "./getGraphQLData";

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
  title: z.string().min(1).trim(),
  titleSlug: z
    .string()
    .trim()
    .regex(/^[a-z0-9\-]+$/),
  timestamp: z
    .string()
    .trim()
    .regex(/^[1-9][0-9]*$/)
    .transform((value) => parseInt(value, 10)),
});

const recentAcSubmissionListParser = z
  .object({
    recentAcSubmissionList: z.array(submissionParser),
  })
  .transform((data) => data.recentAcSubmissionList);

export type RecentAcSubmission = z.infer<typeof submissionParser>;

export async function getRecentAcSubmissionList(
  username: string,
  limit: number = 50,
): Promise<RecentAcSubmission[]> {
  const { data } = await getGraphQLData(QUERY, { username, limit });
  return recentAcSubmissionListParser.parse(data);
}
