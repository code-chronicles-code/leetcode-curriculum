import { GraphQLClient } from "graphql-request";

let client: GraphQLClient | null = null;

export function getGraphQLClient(): GraphQLClient {
  return (client ??= new GraphQLClient("https://leetcode.com/graphql/"));
}
