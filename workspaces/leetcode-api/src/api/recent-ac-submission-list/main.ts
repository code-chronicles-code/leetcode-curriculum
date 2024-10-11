import { z } from "zod";

import { numericIdAsStringZodType } from "@code-chronicles/util/zod-types/numericIdAsStringZodType";
import { timestampZodType } from "@code-chronicles/util/zod-types/timestampZodType";

import { slugZodType } from "../../zod-types/slugZodType.ts";
import { fetchGraphQL } from "./fetchGraphQL.generated.ts";

const submissionZodType = z.object({
  id: numericIdAsStringZodType,
  title: z.string().trim().min(1),
  titleSlug: slugZodType,
  timestamp: timestampZodType,
});

export type RecentAcSubmission = z.infer<typeof submissionZodType>;

const recentAcSubmissionListZodType = z.array(submissionZodType);

export async function fetchRecentAcSubmissionList({
  limit = 50,
  username,
}: {
  limit?: number;
  username: string;
}): Promise<RecentAcSubmission[]> {
  const { recentAcSubmissionList } = await fetchGraphQL({ username, limit });

  return recentAcSubmissionListZodType.parse(recentAcSubmissionList);
}
