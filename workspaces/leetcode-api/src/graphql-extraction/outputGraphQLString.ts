import { isStringEmptyOrWhitespaceOnly } from "@code-chronicles/util/isStringEmptyOrWhitespaceOnly";

export function outputGraphQLString(s: string | null | undefined): string {
  if (s == null || isStringEmptyOrWhitespaceOnly(s)) {
    return "";
  }

  return s.includes("\n") || s.includes('"') ? `"""\n${s}\n"""\n` : `"${s}"\n`;
}
