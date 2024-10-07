import type { PluginFunction } from "@graphql-codegen/plugin-helpers";
import graphqlQueryCompress from "graphql-query-compress";
import invariant from "invariant";
import nullthrows from "nullthrows";
import { z } from "zod";

import { isObject } from "@code-chronicles/util/isObject";
import { only } from "@code-chronicles/util/only";
import { spliceString } from "@code-chronicles/util/spliceString";

const nonNegativeIntZodType = z.number().int().nonnegative();

const operationNameZodType = z.object({
  value: z.string(),
  loc: z.object({ start: nonNegativeIntZodType, end: nonNegativeIntZodType }),
});

export const plugin: PluginFunction<{}> = function plugin(_schema, documents) {
  // Encode some assumptions as invariants, namely that there is a single query
  // operation in the file.
  const { document, rawSDL: unminifiedGraphQL } = only(documents);
  const definition = only(nullthrows(document).definitions);
  invariant(
    isObject(definition) &&
      definition.kind === "OperationDefinition" &&
      definition.operation === "query",
    "Expected a query!",
  );

  // Extract the operation name from the definition, as well as information
  // about its location in the raw, unminified GraphQL.
  const {
    value: operationName,
    loc: { start: operationNameStart, end: operationNameEnd },
  } = operationNameZodType.parse(definition.name);
  const operationNameLength = operationNameEnd - operationNameStart;
  invariant(
    operationName.length === operationNameLength,
    "Operation name length mismatch!",
  );

  // Minify the GraphQL we use for the query.
  const minifiedGraphQL = graphqlQueryCompress(
    spliceString(
      nullthrows(unminifiedGraphQL),
      operationNameStart,
      operationNameLength,
    ),
  );

  return {
    prepend: [
      `
        import type { Simplify } from "type-fest";

        import { getGraphQLClient } from "../../getGraphQLClient.ts";
        import type * as Types from "../../graphqlTypes.generated.ts";
      `,
    ],
    append: [
      `
        export type QueryVariables = Simplify<${operationName}QueryVariables>;
        export type Query = Simplify<${operationName}Query>;  

        export const QUERY = ${JSON.stringify(minifiedGraphQL)};

        export function fetchGraphQL(variables: QueryVariables): Promise<Query> {
          return getGraphQLClient().request(QUERY, variables);
        }
      `,
    ],
    content: "",
  };
};
