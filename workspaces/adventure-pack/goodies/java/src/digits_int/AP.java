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
   * @throws Exception In case of negative integers.
   */
  public static IterableIntStream digits(int number) throws Exception {
    return digits(number, 10);
  }

  /**
   * Get the digits in the given integer for the given radix value. The digits are returned as an
   * {@link IterableIntStream integer stream} with the least significant digit as the first element
   * in the stream. For example, for integer 27363, [3,6,3,7,2] is returned with radix = 10.
   * @param number Integer of interest.
   * @param radix Radix value of interest.
   * @return The {@link IterableIntStream stream} of digits.
   * @throws Exception In case of negative integers or radix less than 2.
   */
  public static IterableIntStream digits(int number, int radix)
    throws Exception {
    if (number < 0) throw new Exception("Please provide a positive integer.");

    if (radix < 2) throw new Exception(
      "Please provide the radix greater than or equal to 2."
    );

    return number == 0
      ? IterableIntStream.from(IntStream.of(0))
      : IterableIntStream.from(
        IntStream.iterate(number, num -> num != 0, num -> num / radix).map(
          num -> num % radix
        )
      );
  }
}
