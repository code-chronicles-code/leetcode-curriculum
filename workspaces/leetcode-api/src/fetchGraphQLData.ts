import { z } from "zod";

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
    throw new Error(`Got status ${response.status} from server!`);
  }

  const graphqlResult = graphqlDataZodType.parse(await response.json());
  if (graphqlResult.data == null && graphqlResult.errors != null) {
    throw new AggregateError(graphqlResult.errors);
  }

  return graphqlResult;
}
