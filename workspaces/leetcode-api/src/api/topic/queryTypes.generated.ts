// THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
// Instead, update the generation process or inputs and run `yarn codegen`.

import type * as Types from "../../graphqlTypes.generated.ts";

export type TopicQueryVariables = Types.Exact<{
  topicId: Types.Scalars["Int"]["input"];
}>;

export type TopicQuery = {
  topic?: {
    title: string;
    solutionTags: Array<{ slug: string } | null>;
    post: { content: string };
  } | null;
};
