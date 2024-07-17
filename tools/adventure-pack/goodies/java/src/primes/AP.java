package primes;

import iterable_int_stream.IterableIntStream;
import java.util.ArrayList;
import java.util.List;
import simple_iterator.SimpleIterator;

public final class AP {

  public static IterableIntStream primes() {
    final boolean[] yieldedTwo = { false };
    final List<Integer> oddPrimes = new ArrayList<>();

    return IterableIntStream.from(
      SimpleIterator.toIterator(() -> {
        if (!yieldedTwo[0]) {
          yieldedTwo[0] = true;
          return 2;
        }

        for (
          int num = oddPrimes.isEmpty()
            ? 3
            : oddPrimes.get(oddPrimes.size() - 1) + 2;;
          num += 2
        ) {
          boolean isPrime = true;
          for (int p : oddPrimes) {
            if (p * p > num) {
              break;
            }
            if (num % p == 0) {
              isPrime = false;
              break;
            }
          }
          if (isPrime) {
            oddPrimes.add(num);
            return num;
          }
        }
      })
    );
  }
}
