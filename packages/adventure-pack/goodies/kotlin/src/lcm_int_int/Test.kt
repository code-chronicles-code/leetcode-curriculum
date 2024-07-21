package lcm_int_int

import kotlin.test.*

internal class LcmTest {
  @Test
  fun findsTheLcm() {
    assertEquals(12, lcm(6, 4), "lcm(6, 4) == 12")
  }
}
