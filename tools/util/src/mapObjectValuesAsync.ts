export async function mapObjectValuesAsync<
  TKey extends PropertyKey,
  TVal,
  TOut,
>(
  obj: Readonly<Record<TKey, TVal>>,
  mapFn: (value: TVal, key: TKey) => Promise<TOut>,
): Promise<Record<TKey, TOut>> {
  const res = {} as Record<TKey, TOut>;

  for (const [key, val] of Object.entries(
    obj as unknown as Record<TKey, TVal>,
  ) as [TKey, TVal][]) {
    // TODO: create a concurrent version of this function

    // eslint-disable-next-line no-await-in-loop
    res[key] = await mapFn(val, key);
  }

  return res;
}
