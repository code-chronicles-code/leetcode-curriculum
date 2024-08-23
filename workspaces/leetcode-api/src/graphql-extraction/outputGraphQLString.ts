import { isStringEmptyOrWhitespaceOnly } from "@code-chronicles/util/isStringEmptyOrWhitespaceOnly";

export function outputGraphQLString(s: string | null | undefined): string {
  if (s == null || isStringEmptyOrWhitespaceOnly(s)) {
    return "";
  }

  return `\n\n"""\n${s}\n"""\n`;
}
