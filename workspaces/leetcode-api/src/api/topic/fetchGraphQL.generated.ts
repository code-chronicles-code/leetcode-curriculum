// THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
// Instead, update the generation process or inputs and run `yarn codegen`.

import type { Simplify } from "type-fest";

import { getGraphQLClient } from "../../getGraphQLClient.ts";
import type * as Types from "../../graphqlTypes.generated.ts";

type TopicQueryVariables = Types.Exact<{
  topicId: Types.Scalars["Int"]["input"];
}>;

type TopicQuery = {
  topic?: {
    title: string;
    solutionTags: Array<{ slug: string } | null>;
    post: { content: string };
  } | null;
};

export type QueryVariables = Simplify<TopicQueryVariables>;
export type Query = Simplify<TopicQuery>;

export const QUERY =
  "query Topic($topicId:Int!){topic(id:$topicId){title solutionTags{slug}post{content}}}";

export function fetchGraphQL(variables: QueryVariables): Promise<Query> {
  return getGraphQLClient().request(QUERY, variables);
}
