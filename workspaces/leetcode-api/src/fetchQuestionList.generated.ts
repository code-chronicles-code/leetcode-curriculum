import type * as Types from "./graphqlTypes.generated.js";

export type FetchQuestionListQueryVariables = Types.Exact<{
  categorySlug: Types.Scalars["String"]["input"];
  limit: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  skip: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  filters: Types.QuestionListFilterInput;
}>;

export type FetchQuestionListQuery = {
  questionList: {
    totalNum: number;
    data: Array<{
      difficulty: string | null;
      isPaidOnly: boolean | null;
      questionFrontendId: string | null;
      title: string;
      titleSlug: string;
    }>;
  } | null;
};
