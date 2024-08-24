package digits_int;

import iterable_int_stream.IterableIntStream;
import java.util.stream.IntStream;

public final class AP {

  /**
   * Get the digits in the given integer. The digits are returned as an
   * {@link IterableIntStream integer stream} with the least significant digit as the first element
   * in the stream. For example, for integer 27363, [3,6,3,7,2] is returned.
   * @param number Integer of interest.
   * @return The {@link IterableIntStream stream} of digits.
   */
  public static IterableIntStream digits(int number) {
    return digits(number, 10);
  }

  /**
   * Get the digits in the given integer for the given radix value. The digits are returned as an
   * {@link IterableIntStream integer stream} with the least significant digit as the first element
   * in the stream. For example, for integer 27363, [3,6,3,7,2] is returned with radix = 10.
   * @param number Integer of interest.
   * @param radix Radix value of interest.
   * @return The {@link IterableIntStream stream} of digits.
   */
  public static IterableIntStream digits(int number, int radix) {
    if (number < 0) throw new IllegalArgumentException(
      "Please provide a positive integer."
    );

    if (radix < 2) throw new IllegalArgumentException(
      "Please provide a radix greater than or equal to 2."
    );

    return IterableIntStream.from(
      number == 0
        ? IntStream.of(0)
        : IntStream.iterate(number, num -> num != 0, num -> num / radix).map(
          num -> num % radix
        )
    );
  }
}
