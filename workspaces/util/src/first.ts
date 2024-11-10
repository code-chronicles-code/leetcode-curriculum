import type { NonEmptyArray } from "@code-chronicles/util/NonEmptyArray";

export function first<T>(array: Readonly<NonEmptyArray<T>>): T;

export function first<T>(array: readonly T[]): T | undefined;

export function first<T>(iterable: Iterable<T>): T | undefined;

export function first<T>(iterable: Iterable<T>): T | undefined {
  if (Array.isArray(iterable)) {
    return iterable[0];
  }

  // eslint-disable-next-line no-unreachable-loop -- Intentional single iteration.
  for (const element of iterable) {
    return element;
  }

  return undefined;
}
