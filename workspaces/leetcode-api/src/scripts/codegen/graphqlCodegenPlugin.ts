import type { PluginFunction } from "@graphql-codegen/plugin-helpers";
import graphqlQueryCompress from "graphql-query-compress";
import invariant from "invariant";
import nullthrows from "nullthrows";
import { z } from "zod";

import { isObject } from "@code-chronicles/util/isObject";
import { only } from "@code-chronicles/util/only";

const operationNameZodType = z
  .object({ value: z.string() })
  .transform(({ value }) => value);

export const plugin: PluginFunction<{}> = function plugin(_schema, documents) {
  // Encode some assumptions as invariants, namely that there is a single query
  // operation in the file.
  const { document, rawSDL: unminifiedGraphql } = only(documents);
  const definition = only(nullthrows(document).definitions);
  invariant(
    isObject(definition) &&
      definition.kind === "OperationDefinition" &&
      definition.operation === "query",
    "Expected a query!",
  );

  const minifiedGraphql = graphqlQueryCompress(nullthrows(unminifiedGraphql));
  const operationName = operationNameZodType.parse(definition.name);

  // TODO: strip out the operation name from the minified GraphQL

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

        export const QUERY = ${JSON.stringify(minifiedGraphql)};

        export function fetchGraphQL(variables: QueryVariables): Promise<Query> {
          return getGraphQLClient().request(QUERY, variables);
        }
      `,
    ],
    content: "",
  };
};
