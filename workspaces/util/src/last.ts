import type { NonEmptyArray } from "@code-chronicles/util/NonEmptyArray";

export function last<T>(array: Readonly<NonEmptyArray<T>>): T;

export function last<T>(array: readonly T[]): T | undefined;

export function last<T>(iterable: Iterable<T>): T | undefined;

export function last<T>(iterable: Iterable<T>): T | undefined {
  if (Array.isArray(iterable)) {
    return iterable.at(-1);
  }

  let res = undefined;
  for (const element of iterable) {
    res = element;
  }

  return res;
}
