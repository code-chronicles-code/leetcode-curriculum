import { outputGraphQLString } from "./outputGraphQLString";

export function outputGraphQLDeprecatedDirective(
  deprecationReason: string | null | undefined,
): string {
  return (
    "@deprecated" +
    (deprecationReason == null
      ? ""
      : `(reason: ${outputGraphQLString(deprecationReason)})`)
  );
}
