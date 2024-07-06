package gcd;

public class Main {

  public static int gcd(int a, int b) {
    if (a < 0 || b < 0) {
      throw new IllegalArgumentException(
        "Can only find the GCD of non-negative integers!"
      );
    }

    while (b != 0) {
      int tmp = b;
      b = a % b;
      a = tmp;
    }

    return a;
  }
}
