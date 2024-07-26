import { z } from "zod";

const parser = z.object({
  data: z.unknown(),
  errors: z.array(z.unknown()).optional(),
});

export type GraphQLData = z.infer<typeof parser>;

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
    throw new Error(`Got status ${response.status} from server!`);
  }

  const graphqlResult = parser.parse(await response.json());
  if (graphqlResult.data == null && graphqlResult.errors != null) {
    throw new Error(JSON.stringify(graphqlResult.errors, null, 2));
  }

  return graphqlResult;
}
