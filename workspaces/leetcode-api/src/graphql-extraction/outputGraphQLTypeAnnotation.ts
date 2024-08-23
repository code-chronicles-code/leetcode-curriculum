import nullthrows from "nullthrows";

import type { InnerType } from "../fetchGraphQLTypeInformation";

export function outputGraphQLTypeAnnotation(innerType: InnerType): string {
  if (innerType.kind === "LIST") {
    return (
      "[" + outputGraphQLTypeAnnotation(nullthrows(innerType.ofType)) + "]"
    );
  }

  if (innerType.kind === "NON_NULL") {
    return outputGraphQLTypeAnnotation(nullthrows(innerType.ofType)) + "!";
  }

  return nullthrows(innerType.name);
}
