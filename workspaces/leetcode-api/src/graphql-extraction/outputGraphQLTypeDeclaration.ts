import nullthrows from "nullthrows";

import type { GraphQLKind } from "@code-chronicles/util/graphqlKindTypeZodType";

import { outputGraphQLElementWithDescription } from "./outputGraphQLElementWithDescription";

const KIND_TO_DECLARATION: Partial<Record<GraphQLKind, string>> = {
  ENUM: "enum",
  INPUT_OBJECT: "input",
  INTERFACE: "interface",
  OBJECT: "type",
  SCALAR: "scalar",
} as const;

export function outputGraphQLTypeDeclaration({
  name,
  kind,
  description,
  body,
}: {
  name: string;
  kind: GraphQLKind;
  description: string | null | undefined;
  body: string | null | undefined;
}): string {
  const declaration = nullthrows(KIND_TO_DECLARATION[kind]);

  let res = outputGraphQLElementWithDescription({
    element: `${declaration} ${name}`,
    description,
    directives: null,
  });
  if (body != null) {
    res += ` { ${body} }`;
  }

  return res;
}
