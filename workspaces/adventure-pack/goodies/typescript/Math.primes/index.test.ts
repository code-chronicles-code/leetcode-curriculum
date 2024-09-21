import { describe, expect, it } from "@jest/globals";

import "./index.ts";

describe("Math.primes", () => {
  it("generates the correct small primes", () => {
    const primes = Math.primes();

    [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59].forEach(
      (p) => {
        expect(primes.next().value).toBe(p);
      },
    );
  });

  it("generates the correct number of primes", () => {
    let count = 0;

    for (const p of Math.primes()) {
      if (p > 10 ** 6) {
        break;
      }

      ++count;
    }

    expect(count).toBe(78498);
  });
});
