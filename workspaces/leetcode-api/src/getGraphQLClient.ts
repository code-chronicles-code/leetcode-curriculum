import { GraphQLClient } from "graphql-request";

type ErrorPolicy = NonNullable<
  NonNullable<ConstructorParameters<typeof GraphQLClient>[1]>["errorPolicy"]
>;

export function getGraphQLClient(
  errorPolicy: ErrorPolicy = "none",
): GraphQLClient {
  return new GraphQLClient("https://leetcode.com/graphql/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    excludeOperationName: true,
    errorPolicy,
  });
}
