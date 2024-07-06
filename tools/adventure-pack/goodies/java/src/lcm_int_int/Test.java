package lcm_int_int;

import static lcm_int_int.AP.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class LcmTest {

  @Test
  public void findsTheLcm() {
    assertEquals(12, lcm(6, 4), "lcm(6, 4) == 12");
  }
}
