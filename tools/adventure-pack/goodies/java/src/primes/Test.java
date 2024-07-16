package primes;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static primes.AP.primes;

import java.util.List;
import org.junit.jupiter.api.Test;

class PrimeTest {

  @Test
  public void generatesTheCorrectSmallPrimes() {
    var smallPrimes = List.of(
      2,
      3,
      5,
      7,
      11,
      13,
      17,
      19,
      23,
      29,
      31,
      37,
      41,
      43,
      47,
      53,
      59
    );
    assertIterableEquals(
      smallPrimes,
      primes().limit(smallPrimes.size()).toList()
    );
  }

  @Test
  public void generatesTheCorrectNumberOfPrimes() {
    assertEquals(78498, primes().takeWhile(p -> p < 1000000).count());
  }
}
