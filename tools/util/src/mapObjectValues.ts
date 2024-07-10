export function mapObjectValues<TIn, TOut>(
  obj: Readonly<Record<string, TIn>>,
  mapFn: (value: TIn, key: string) => TOut,
): Record<string, TOut> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [key, mapFn(val, key)]),
  );
}
