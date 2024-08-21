import { describe, expect, it } from "@jest/globals";
import { chunkBySize } from "../chunkBySize";

describe("chunkBySize", () => {
  it("splits an input array into smaller arrays", () => {
    const result = chunkBySize([1, 2, 3, 4], 2);
    expect([...result]).toStrictEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it("handles an array not perfectly divisible by chunk size", () => {
    const result = chunkBySize([1, 2, 3], 2);
    expect([...result]).toStrictEqual([[1, 2], [3]]);
  });

  it("throws a TypeError if array contains undefined elements (sparse array)", () => {
    expect(() => {
      const result = chunkBySize([1, , 3], 2); // Sparse array
      [...result];
    }).toThrow(TypeError);
    expect(() => {
      const result = chunkBySize([1, undefined, 3], 2);
      [...result];
    }).toThrow("Array elements cannot be undefined!");
  });

  it("throws an error for a chunk size less than 1", () => {
    expect(() => {
      const result = chunkBySize([1, 2, 3], 0);
      [...result];
    }).toThrow("Chunk size must be a positive integer!");
  });

  it("throws an error for a non-integer chunk size", () => {
    expect(() => {
      const result = chunkBySize([1, 2, 3], 1.5);
      [...result];
    }).toThrow("Chunk size must be a positive integer!");
  });
});
