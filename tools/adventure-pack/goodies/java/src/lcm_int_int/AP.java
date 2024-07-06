package lcm_int_int;

import static gcd_int_int.AP.*;

public final class AP {

  public static int lcm(int a, int b) {
    return (a / gcd(a, b)) * b;
  }
}
