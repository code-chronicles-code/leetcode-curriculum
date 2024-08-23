import { outputGraphQLString } from "./outputGraphQLString";

export function outputGraphQLElementWithDescription({
  element,
  description,
  directives,
}: {
  element: string;
  description: string | null | undefined;
  directives: string | null | undefined;
}): string {
  return `${outputGraphQLString(description)} ${element} ${directives ?? ""}`;
}
