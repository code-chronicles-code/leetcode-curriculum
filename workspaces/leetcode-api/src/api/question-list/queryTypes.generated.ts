// THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
// Instead, update the generation process or inputs and run `yarn codegen`.

import type * as Types from "../../graphqlTypes.generated.ts";

export type QuestionListQueryVariables = Types.Exact<{
  categorySlug: Types.Scalars["String"]["input"];
  limit?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  skip?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  filters: Types.QuestionListFilterInput;
}>;

export type QuestionListQuery = {
  questionList: {
    totalNum: number;
    data: Array<{
      difficulty: string;
      isPaidOnly: boolean;
      questionFrontendId: string;
      title: string;
      titleSlug: string;
      challengeQuestionsV2: Array<{ date: string }>;
    }>;
  };
};
