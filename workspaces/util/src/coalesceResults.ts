import { getResult } from "@code-chronicles/util/getResult";

export function coalesceResults<T>(
  // This function is only worth using if it's invoked with at least two arguments.
  ...functions: readonly [() => T, () => T, ...(() => T)[]]
): T {
  const errors = [];

  for (const fn of functions) {
    const result = getResult(fn);
    if (result.isSuccess) {
      return result.value;
    }

    errors.push(result.error);
  }

  throw new AggregateError(
    errors,
    "None of the given functions returned without throwing!",
  );
}
