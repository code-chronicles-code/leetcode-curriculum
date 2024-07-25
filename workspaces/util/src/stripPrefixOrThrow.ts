import invariant from "invariant";

import { stripPrefix } from "@code-chronicles/util/stripPrefix";

export function stripPrefixOrThrow(s: string, prefix: string): string {
  const res = stripPrefix(s, prefix);
  invariant(res.length < s.length, "Didn't strip anything!");
  return res;
}
