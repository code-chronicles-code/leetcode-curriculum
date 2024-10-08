import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType,
  type GraphQLInputType,
  type GraphQLOutputType,
} from "graphql";
import nullthrows from "nullthrows";
import type { ReadonlyDeep } from "type-fest";

import type { InnerType } from "../../fetchGraphQLTypeInformation.ts";

export function getFakeScalarType(
  innerType: ReadonlyDeep<InnerType>,
): GraphQLInputType & GraphQLOutputType {
  if (innerType.kind === "LIST") {
    return new GraphQLList(getFakeScalarType(nullthrows(innerType.ofType)));
  }

  if (innerType.kind === "NON_NULL") {
    return new GraphQLNonNull(getFakeScalarType(nullthrows(innerType.ofType)));
  }

  return new GraphQLScalarType({ name: nullthrows(innerType.name) });
}
