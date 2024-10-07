// THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
// Instead, update the generation process or inputs and run `yarn codegen`.

import type * as Types from "../../graphqlTypes.generated.ts";

export type ActiveDailyCodingChallengeQuestionQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type ActiveDailyCodingChallengeQuestionQuery = {
  activeDailyCodingChallengeQuestion?: {
    date?: unknown;
    question: {
      difficulty?: string | null;
      questionFrontendId?: string | null;
      title: string;
      titleSlug: string;
    };
  } | null;
};
