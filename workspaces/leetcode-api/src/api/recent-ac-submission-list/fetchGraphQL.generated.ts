// THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
// Instead, update the generation process or inputs and run `yarn codegen`.

import { z } from "zod";

import { getGraphQLClient } from "../../getGraphQLClient.ts";
import type * as Types from "../../graphqlTypes.generated.ts";
import { slugZodType } from "../../zod-types/slugZodType.ts";

type RecentAcSubmissionListQueryVariables = Types.Exact<{
  username: Types.Scalars["String"]["input"];
  limit: Types.Scalars["Int"]["input"];
}>;

type RecentAcSubmissionListQuery = {
  recentAcSubmissionList: Array<{
    id: string;
    title: string;
    titleSlug: string;
    timestamp: string;
  }>;
};

export const QUERY =
  "query($username:String!,$limit:Int!){recentAcSubmissionList(username:$username,limit:$limit){id title titleSlug timestamp}}";

export const queryResultZodType = z.object({
  recentAcSubmissionList: z.array(
    z.object({
      id: z.string(),
      title: z.string().trim(),
      titleSlug: slugZodType,
      timestamp: z.string(),
    }),
  ),
});

export type QueryResult = z.infer<typeof queryResultZodType>;
export type QueryVariables = RecentAcSubmissionListQueryVariables;

export async function fetchGraphQL(
  variables: QueryVariables,
): Promise<QueryResult> {
  const untrustedData = await getGraphQLClient().request(QUERY, variables);

  // The type annotation serves as a TypeScript assert that the generated
  // Zod type is compatible with the types generated by GraphQL Codegen.
  const validatedData: RecentAcSubmissionListQuery & QueryResult =
    queryResultZodType.parse(untrustedData);

  return validatedData;
}
