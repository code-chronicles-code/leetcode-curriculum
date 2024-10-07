// THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
// Instead, update the generation process or inputs and run `yarn codegen`.

import type { Simplify } from "type-fest";

import { getGraphQLClient } from "../../getGraphQLClient.ts";
import type * as Types from "../../graphqlTypes.generated.ts";

type RecentAcSubmissionListQueryVariables = Types.Exact<{
  username: Types.Scalars["String"]["input"];
  limit: Types.Scalars["Int"]["input"];
}>;

type RecentAcSubmissionListQuery = {
  recentAcSubmissionList?: Array<{
    id?: string | null;
    title?: string | null;
    titleSlug?: string | null;
    timestamp?: string | null;
  }> | null;
};

export type QueryVariables = Simplify<RecentAcSubmissionListQueryVariables>;
export type Query = Simplify<RecentAcSubmissionListQuery>;

export const QUERY =
  "query RecentAcSubmissionList($username:String!,$limit:Int!){recentAcSubmissionList(username:$username,limit:$limit){id title titleSlug timestamp}}";

export function fetchGraphQL(variables: QueryVariables): Promise<Query> {
  return getGraphQLClient().request(QUERY, variables);
}
