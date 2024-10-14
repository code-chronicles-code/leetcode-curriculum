import { toTitleCase } from "@code-chronicles/util/toTitleCase";

export function isStringTitleCase(s: string): boolean {
  return s === toTitleCase(s);
}
