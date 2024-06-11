import { z } from "zod";

const parser = z.object({
  data: z.unknown(),
});

export type GraphQLData = z.infer<typeof parser>;

export async function getGraphQLData(
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

  return parser.parse(await response.json());
}
