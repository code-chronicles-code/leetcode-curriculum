// THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
// Instead, update the generation process or inputs and run `yarn codegen`.

import type { Simplify } from "type-fest";

import { getGraphQLClient } from "../../getGraphQLClient.ts";
import type * as Types from "../../graphqlTypes.generated.ts";

type QuestionListQueryVariables = Types.Exact<{
  categorySlug: Types.Scalars["String"]["input"];
  limit?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  skip?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  filters: Types.QuestionListFilterInput;
}>;

type QuestionListQuery = {
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

export type QueryVariables = Simplify<QuestionListQueryVariables>;
export type Query = Simplify<QuestionListQuery>;

export const QUERY =
  "query($categorySlug:String!,$limit:Int,$skip:Int,$filters:QuestionListFilterInput!){questionList(categorySlug:$categorySlug limit:$limit skip:$skip filters:$filters){data{difficulty isPaidOnly questionFrontendId title titleSlug}totalNum}}";

export function fetchGraphQL(variables: QueryVariables): Promise<Query> {
  return getGraphQLClient().request(QUERY, variables);
}
