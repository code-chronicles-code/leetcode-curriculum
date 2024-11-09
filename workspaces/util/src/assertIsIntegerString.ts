import invariant from "invariant";

export function assertIsIntegerString(s: string): number {
  const n = parseInt(s, 10);
  invariant(
    !Number.isNaN(n) && String(n) === s,
    "Parsed integer doesn't restringify to the same input.",
  );
  return n;
}
