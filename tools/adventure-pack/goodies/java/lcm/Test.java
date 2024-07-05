import static lcm.Main.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class LcmTest {

  @Test
  public void findsTheLcm() {
    assertEquals(12, lcm(6, 4), "lcm(6, 4) should be 12");
  }
}
