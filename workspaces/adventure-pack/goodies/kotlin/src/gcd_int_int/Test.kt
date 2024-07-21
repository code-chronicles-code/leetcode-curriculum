package gcd_int_int

import kotlin.test.*

internal class GcdTest {
  @Test
  fun findsTheGcd() {
    assertEquals(3, gcd(9, 12), "gcd(9, 12) == 3")
  }
}
