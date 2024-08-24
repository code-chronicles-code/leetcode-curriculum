package digits_int;

import static digits_int.AP.digits;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

import iterable_int_stream.IterableIntStream;
import java.util.List;
import java.util.stream.IntStream;
import org.junit.jupiter.api.Test;

class DigitsIntTest {

  @Test
  public void withIntegerGreaterThanZero() {
    assertIterableEquals(List.of(4, 8, 9, 4), digits(4984));
  }

  @Test
  public void withZero() {
    assertIterableEquals(List.of(0), digits(0));
  }

  @Test
  public void withRadixOtherThan10() {
    assertIterableEquals(List.of(4, 6, 6, 0, 5), digits(12345, 7));
  }

  @Test
  public void withRadixLessThan2() {
    assertThrows(IllegalArgumentException.class, () -> digits(12345, 1));
  }

  @Test
  public void withNegativeInteger() {
    assertThrows(IllegalArgumentException.class, () -> digits(-145));
  }
}
