package integer_digits;

import iterable_int_stream.IterableIntStream;
import java.util.stream.IntStream;

public final class AP {

  /**
   * Get the digits in the given integer. For example, in the given integer 8725, digits are
   * [8, 7, 2, 5].
   * @param number Any number of interest.
   * @return The {@link IterableIntStream stream} of digits in the given integer.
   */
  public static IterableIntStream integerDigits(int number) {
    var digitsInReverse = IntStream.iterate(
      number,
      n1 -> n1 != 0,
      n1 -> n1 / 10
    )
      .map(n1 -> n1 % 10)
      .toArray();

    var streamBuilder = IntStream.builder();
    for (int i = digitsInReverse.length - 1; i >= 0; i--) {
      streamBuilder.add(digitsInReverse[i]);
    }

    return IterableIntStream.from(streamBuilder.build());
  }
}
