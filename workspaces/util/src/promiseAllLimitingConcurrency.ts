import { chunkBySize } from "@code-chronicles/util/chunkBySize";

export async function promiseAllLimitingConcurrency<
  T extends readonly (() => Promise<unknown>)[] | [],
>(
  factories: T,
  concurrencyLimit: number,
): Promise<{ -readonly [P in keyof T]: Awaited<ReturnType<T[P]>> }> {
  const res = [] as unknown as unknown[] & {
    -readonly [P in keyof T]: Awaited<ReturnType<T[P]>>;
  };

  for (const chunk of chunkBySize(factories, concurrencyLimit)) {
    // eslint-disable-next-line no-await-in-loop -- Intentional await in loop to limit concurrency!
    res.push(...(await Promise.all(chunk.map((factory) => factory()))));
  }

  return res;
}
