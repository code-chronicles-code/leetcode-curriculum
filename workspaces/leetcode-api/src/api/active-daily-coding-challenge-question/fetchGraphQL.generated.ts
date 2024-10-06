import type * as Types from "../../graphqlTypes.generated.js";

import type { Simplify } from "type-fest";

import { getGraphQLClient } from "../../getGraphQLClient.ts";

type FetchActiveDailyCodingChallengeQuestionQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

type FetchActiveDailyCodingChallengeQuestionQuery = {
  activeDailyCodingChallengeQuestion?: {
    date: unknown;
    question: {
      difficulty?: string | null;
      questionFrontendId?: string | null;
      title: string;
      titleSlug: string;
    };
  } | null;
};

export type QueryVariables =
  Simplify<FetchActiveDailyCodingChallengeQuestionQueryVariables>;
export type Query = Simplify<FetchActiveDailyCodingChallengeQuestionQuery>;

export const QUERY =
  "query fetchActiveDailyCodingChallengeQuestion{activeDailyCodingChallengeQuestion{date question{difficulty questionFrontendId title titleSlug}}}";

export function fetchGraphQL(variables: QueryVariables): Promise<Query> {
  return getGraphQLClient().request(QUERY, variables);
}
