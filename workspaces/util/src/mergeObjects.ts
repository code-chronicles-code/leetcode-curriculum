import { groupBy } from "@code-chronicles/util/groupBy";
import { only } from "@code-chronicles/util/only";

export function mergeObjects<TObj extends Record<string, unknown>>(
  objects: Iterable<TObj>,
  mergeFn: <TKey extends keyof TObj>(
    values: [TObj[TKey], TObj[TKey], ...TObj[TKey][]],
    key: TKey,
  ) => TObj[TKey],
): TObj {
  const groupedEntries = [
    ...groupBy(
      [...objects].flatMap(Object.entries) as [string, TObj][],
      ([key]) => key,
    ),
  ];

  return Object.fromEntries(
    groupedEntries.map(([key, entries]) =>
      entries.length === 1
        ? only(entries)
        : [
            key,
            mergeFn(
              entries.map(([, value]) => value) as [
                TObj[typeof key],
                TObj[typeof key],
                ...TObj[typeof key][],
              ],
              key,
            ),
          ],
    ),
  ) as TObj;
}
