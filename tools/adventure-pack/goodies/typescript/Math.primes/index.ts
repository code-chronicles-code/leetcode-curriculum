declare global {
  interface Math {
    primes(): Generator<number, void, void>;
  }
}

Math.primes = function* (): Generator<number, void, void> {
  yield 2;

  const oddPrimes: number[] = [];
  for (let num = 3; ; num += 2) {
    let isPrime = true;
    for (const p of oddPrimes) {
      if (p * p > num) {
        break;
      }
      if (num % p === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      yield num;
      oddPrimes.push(num);
    }
  }
};

// Needed to fix the error "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations. ts(2669)"
// See: https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};
