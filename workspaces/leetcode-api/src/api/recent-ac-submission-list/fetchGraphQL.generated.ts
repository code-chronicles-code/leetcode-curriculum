import type * as Types from "../../graphqlTypes.generated.js";

import type { Simplify } from "type-fest";

import { getGraphQLClient } from "../../getGraphQLClient.ts";

type FetchRecentAcSubmissionListQueryVariables = Types.Exact<{
  username: Types.Scalars["String"]["input"];
  limit: Types.Scalars["Int"]["input"];
}>;

type FetchRecentAcSubmissionListQuery = {
  recentAcSubmissionList?: Array<{
    id?: string | null;
    title?: string | null;
    titleSlug?: string | null;
    timestamp?: string | null;
  }> | null;
};

export type QueryVariables =
  Simplify<FetchRecentAcSubmissionListQueryVariables>;
export type Query = Simplify<FetchRecentAcSubmissionListQuery>;

export const QUERY =
  "query fetchRecentAcSubmissionList($username:String!,$limit:Int!){recentAcSubmissionList(username:$username,limit:$limit){id title titleSlug timestamp}}";

export function fetchGraphQL(variables: QueryVariables): Promise<Query> {
  return getGraphQLClient().request(QUERY, variables);
}
