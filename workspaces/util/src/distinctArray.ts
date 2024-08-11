import { identity } from "@code-chronicles/util/identity";

export function distinctArray<TVal>(iterable: Iterable<TVal>): TVal[];
export function distinctArray<TVal, TKey>(
  iterable: Iterable<TVal>,
  keyFn: (value: TVal) => TKey,
): TVal[];
export function distinctArray<TVal, TKey>(
  iterable: Iterable<TVal>,
  keyFn: (value: TVal) => TKey = identity as (value: TVal) => TKey,
): TVal[] {
  const map = new Map<TKey, TVal>();
  for (const element of iterable) {
    map.set(keyFn(element), element);
  }

  return [...map.values()];
}
