package digits_int;

import static digits_int.AP.digits;
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
    var digits = digits(4984);
    assertIterableEquals(
      IterableIntStream.from(IntStream.of(4, 8, 9, 4)),
      digits
    );
  }

  @Test
  public void withZero() {
    var digits = digits(0);
    assertIterableEquals(IterableIntStream.from(IntStream.of(0)), digits);
  }

  @Test
  public void withRadixOtherThan10() {
    var digits = digits(12345, 7);
    assertIterableEquals(
      IterableIntStream.from(IntStream.of(4, 6, 6, 0, 5)),
      digits
    );
  }

  @Test
  public void withRadixLessThan2() {
    Exception thrown = assertThrows(Exception.class, () -> digits(12345, 1));
    assertTrue(thrown instanceof IllegalArgumentException);
  }

  @Test
  public void withNegativeInteger() {
    Exception thrown = assertThrows(Exception.class, () -> digits(-145));
    assertTrue(thrown instanceof IllegalArgumentException);
  }
}
