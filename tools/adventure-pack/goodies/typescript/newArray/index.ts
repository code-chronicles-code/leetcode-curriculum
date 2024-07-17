import { nullthrows } from "../nullthrows";

export function newArray(dimensions: [], fillValue?: unknown): never;
export function newArray<T>(dimensions: [number]): (T | null)[];
export function newArray<T>(dimensions: [number, number]): (T | null)[][];
export function newArray<T>(
  dimensions: [number, number, number],
): (T | null)[][][];
export function newArray<T>(
  dimensions: [number, number, number, number],
): (T | null)[][][][];
export function newArray<T>(
  dimensions: [number, number, number, number, number],
): (T | null)[][][][][];
export function newArray<T>(dimensions: [number], fillValue: T): T[];
export function newArray<T>(dimensions: [number, number], fillValue: T): T[][];
export function newArray<T>(
  dimensions: [number, number, number],
  fillValue: T,
): T[][][];
export function newArray<T>(
  dimensions: [number, number, number, number],
  fillValue: T,
): T[][][][];
export function newArray<T>(
  dimensions: [number, number, number, number, number],
  fillValue: T,
): T[][][][][];
export function newArray(dimensions: number[], fillValue?: unknown): unknown;
export function newArray(
  [first, ...rest]: number[],
  fillValue: unknown = null,
): unknown {
  const outer = Array(nullthrows(first, "Missing dimensions!"));
  if (rest.length === 0) {
    return outer.fill(fillValue);
  }
  for (let i = 0; i < first; ++i) {
    outer[i] = newArray(rest, fillValue);
  }
  return outer;
}
