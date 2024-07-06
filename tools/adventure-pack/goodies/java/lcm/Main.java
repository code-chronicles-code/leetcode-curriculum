package lcm;

import static gcd.Main.*;

public class Main {

  public static int lcm(int a, int b) {
    return (a / gcd(a, b)) * b;
  }
}
