// THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
// Instead, update the generation process or inputs and run `yarn codegen`.

import type { Simplify } from "type-fest";

import { getGraphQLClient } from "../../getGraphQLClient.ts";
import type * as Types from "../../graphqlTypes.generated.ts";

type ActiveDailyCodingChallengeQuestionQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

type ActiveDailyCodingChallengeQuestionQuery = {
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
  Simplify<ActiveDailyCodingChallengeQuestionQueryVariables>;
export type Query = Simplify<ActiveDailyCodingChallengeQuestionQuery>;

export const QUERY =
  "query ActiveDailyCodingChallengeQuestion{activeDailyCodingChallengeQuestion{date question{difficulty questionFrontendId title titleSlug}}}";

export function fetchGraphQL(variables: QueryVariables): Promise<Query> {
  return getGraphQLClient().request(QUERY, variables);
}
