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

  // TODO: might be cool to use some kind of queueing system!
  for (const chunk of chunkBySize(factories, concurrencyLimit)) {
    // eslint-disable-next-line no-await-in-loop -- Intentional await in loop to limit concurrency!
    res.push(...(await Promise.all(chunk.map((factory) => factory()))));
  }

  return res;
}
