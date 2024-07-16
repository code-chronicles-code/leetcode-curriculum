package gcd_int_int

public fun gcd(a: Int, b: Int): Int {
  var mutableA = a
  var mutableB = b

  while (mutableB != 0) {
    mutableB = (mutableA % mutableB).also { mutableA = mutableB }
  }

  return mutableA
}
