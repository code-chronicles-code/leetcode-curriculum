// THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
// Instead, update the generation process or inputs and run `yarn codegen`.

import type * as Types from "../../graphqlTypes.generated.ts";

export type RecentAcSubmissionListQueryVariables = Types.Exact<{
  username: Types.Scalars["String"]["input"];
  limit: Types.Scalars["Int"]["input"];
}>;

export type RecentAcSubmissionListQuery = {
  recentAcSubmissionList?: Array<{
    id?: string | null;
    title?: string | null;
    titleSlug?: string | null;
    timestamp?: string | null;
  }> | null;
};
