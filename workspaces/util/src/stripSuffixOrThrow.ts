import invariant from "invariant";

import { stripSuffix } from "@code-chronicles/util/stripSuffix";

export function stripSuffixOrThrow(s: string, suffix: string): string {
  const res = stripSuffix(s, suffix);
  invariant(res.length < s.length, "Didn't strip anything!");
  return res;
}
