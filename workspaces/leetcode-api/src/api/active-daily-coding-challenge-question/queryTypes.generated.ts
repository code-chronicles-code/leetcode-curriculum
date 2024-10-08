// THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
// Instead, update the generation process or inputs and run `yarn codegen`.

import type * as Types from "../../graphqlTypes.generated.ts";

export type ActiveDailyCodingChallengeQuestionQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type ActiveDailyCodingChallengeQuestionQuery = {
  activeDailyCodingChallengeQuestion: {
    date: string;
    question: {
      difficulty: string;
      questionFrontendId: string;
      title: string;
      titleSlug: string;
    };
  };
};
