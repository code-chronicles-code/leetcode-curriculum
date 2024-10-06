import type * as Types from "../../graphqlTypes.generated.js";

import type { Simplify } from "type-fest";

import { getGraphQLClient } from "../../getGraphQLClient.ts";

type FetchQuestionListQueryVariables = Types.Exact<{
  categorySlug: Types.Scalars["String"]["input"];
  limit?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  skip?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  filters: Types.QuestionListFilterInput;
}>;

type FetchQuestionListQuery = {
  questionList?: {
    totalNum: number;
    data: Array<{
      difficulty?: string | null;
      isPaidOnly?: boolean | null;
      questionFrontendId?: string | null;
      title: string;
      titleSlug: string;
    }>;
  } | null;
};

export type QueryVariables = Simplify<FetchQuestionListQueryVariables>;
export type Query = Simplify<FetchQuestionListQuery>;

export const QUERY =
  "query fetchQuestionList($categorySlug:String!,$limit:Int,$skip:Int,$filters:QuestionListFilterInput!){questionList(categorySlug:$categorySlug limit:$limit skip:$skip filters:$filters){data{difficulty isPaidOnly questionFrontendId title titleSlug}totalNum}}";

export function fetchGraphQL(variables: QueryVariables): Promise<Query> {
  return getGraphQLClient().request(QUERY, variables);
}
