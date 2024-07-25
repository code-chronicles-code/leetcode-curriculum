import { compareStrings } from "@code-chronicles/util/compareStrings";

export function sortObjectKeys<TObj extends Record<string, unknown>>(
  obj: Readonly<TObj>,
  compareFn: (a: string, b: string) => number = compareStrings,
): TObj {
  return Object.fromEntries(
    Object.entries(obj).sort(([a], [b]) => compareFn(a, b)),
  ) as TObj;
}
