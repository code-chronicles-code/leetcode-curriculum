package digits_int;

import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

import iterable_int_stream.IterableIntStream;
import java.util.stream.IntStream;
import org.junit.jupiter.api.Test;

class DigitsIntTest {

  @Test
  public void withIntegerGreaterThanZero() {
    try {
      var digits = AP.digits(4984);
      assertIterableEquals(
        IterableIntStream.from(IntStream.of(4, 8, 9, 4)),
        digits,
        "Test Failed. Digits generated for positive integer are not correct."
      );
    } catch (Exception e) {
      e.printStackTrace();
      fail();
    }
  }

  @Test
  public void withZero() {
    try {
      var digits = AP.digits(0);
      assertIterableEquals(
        IterableIntStream.from(IntStream.of(0)),
        digits,
        "Test Failed. Digits generated for integer 0 are not correct."
      );
    } catch (Exception e) {
      e.printStackTrace();
      fail();
    }
  }

  @Test
  public void withRadixOtherThan10() {
    try {
      var digits = AP.digits(12345, 7);
      assertIterableEquals(
        IterableIntStream.from(IntStream.of(4, 6, 6, 0, 5)),
        digits,
        "Test Failed. Digits generated for the integer with radix other than 10 are not correct."
      );
    } catch (Exception e) {
      e.printStackTrace();
      fail();
    }
  }

  @Test
  public void withRadixLessThan2() {
    Exception thrown = assertThrows(
      Exception.class,
      () -> AP.digits(12345, 1),
      "Test Failed. Does not throw exception for radix less than 2."
    );
    assertTrue(
      thrown
        .getMessage()
        .contains("Please provide the radix greater than or equal to 2.")
    );
  }
}
