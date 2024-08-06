import type { Merge, Writable } from "type-fest";

type NonNullableValues<T extends Record<string, unknown>> = {
  [K in keyof T]: NonNullable<T[K]>;
};

export type OptionalInsteadOfNullishValues<T extends Record<string, unknown>> =
  Merge<
    NonNullableValues<T>,
    Partial<{
      [K in keyof T as null extends T[K]
        ? K
        : undefined extends T[K]
          ? K
          : never]: NonNullable<T[K]>;
    }>
  >;

export function removeKeysWithNullishValues<T extends Record<string, unknown>>(
  obj: T,
): Writable<OptionalInsteadOfNullishValues<T>> {
  return Object.fromEntries(
    Object.entries(obj).filter((entry) => entry[1] != null),
  ) as Writable<OptionalInsteadOfNullishValues<T>>;
}

// TODO: maybe add a recursive version of this utility
