// TODO: maybe improve the typing here

export async function mapObjectValuesAsync<TIn, TOut>(
  obj: Readonly<Record<string, TIn>>,
  mapFn: (value: TIn, key: string) => Promise<TOut>,
): Promise<Record<string, TOut>> {
  return Object.fromEntries(
    await Promise.all(
      Object.entries(obj).map(async ([key, val]) => [
        key,
        await mapFn(val, key),
      ]),
    ),
  );
}
