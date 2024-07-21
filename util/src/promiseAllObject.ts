import { mapObjectValuesAsync } from "./mapObjectValuesAsync";

export function promiseAllObject<TObj extends Record<string, Promise<unknown>>>(
  obj: TObj,
): Promise<{ [K in keyof TObj]: Awaited<TObj[K]> }> {
  return mapObjectValuesAsync(obj, (val) => val) as Promise<{
    [K in keyof TObj]: Awaited<TObj[K]>;
  }>;
}
