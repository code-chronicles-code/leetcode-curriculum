package lcm_int_int

import gcd_int_int.gcd

public fun lcm(a: Int, b: Int): Int = a / gcd(a, b) * b
