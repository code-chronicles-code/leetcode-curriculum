import { identity } from "@code-chronicles/util/identity";
import { mapObjectValuesAsync } from "@code-chronicles/util/mapObjectValuesAsync";

export function promiseAllObject<TObj extends Record<string, Promise<unknown>>>(
  obj: TObj,
): Promise<{ [K in keyof TObj]: Awaited<TObj[K]> }> {
  return mapObjectValuesAsync(obj, identity) as Promise<{
    [K in keyof TObj]: Awaited<TObj[K]>;
  }>;
}
