export function sortObjectKeys<TObj extends Record<PropertyKey, unknown>>(
  obj: Readonly<TObj>,
  compareFn: (a: keyof TObj, b: keyof TObj) => number = (
    a: PropertyKey,
    b: PropertyKey,
  ): number => String(a).localeCompare(String(b)),
): TObj {
  const res = {} as TObj;
  for (const key of (Object.keys(obj) as (keyof TObj)[]).sort(compareFn)) {
    res[key] = obj[key];
  }
  return res;
}
