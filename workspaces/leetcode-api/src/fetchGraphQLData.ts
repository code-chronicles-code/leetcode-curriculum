import { z } from "zod";

import { maybeThrow } from "@code-chronicles/util/maybeThrow";

const graphqlDataZodType = z.object({
  data: z.unknown(),
  errors: z.array(z.unknown()).optional(),
});

export type GraphQLData = z.infer<typeof graphqlDataZodType>;

export async function fetchGraphQLData(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<GraphQLData> {
  const response = await fetch("https://leetcode.com/graphql/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    console.error(await response.text());
    throw new Error(`Got status ${response.status} from server!`);
  }

  const graphqlResult = graphqlDataZodType.parse(await response.json());
  if (graphqlResult.data == null && graphqlResult.errors != null) {
    maybeThrow(graphqlResult.errors);
  }

  return graphqlResult;
}
