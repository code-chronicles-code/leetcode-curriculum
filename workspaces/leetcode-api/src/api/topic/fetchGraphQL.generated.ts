import type * as Types from "../../graphqlTypes.generated.js";

import type { Simplify } from "type-fest";

import { getGraphQLClient } from "../../getGraphQLClient.ts";

type FetchTopicQueryVariables = Types.Exact<{
  topicId: Types.Scalars["Int"]["input"];
}>;

type FetchTopicQuery = {
  topic?: {
    title: string;
    solutionTags: Array<{ slug: string } | null>;
    post: { content: string };
  } | null;
};

export type QueryVariables = Simplify<FetchTopicQueryVariables>;
export type Query = Simplify<FetchTopicQuery>;

export const QUERY =
  "query fetchTopic($topicId:Int!){topic(id:$topicId){title solutionTags{slug}post{content}}}";

export function fetchGraphQL(variables: QueryVariables): Promise<Query> {
  return getGraphQLClient().request(QUERY, variables);
}
