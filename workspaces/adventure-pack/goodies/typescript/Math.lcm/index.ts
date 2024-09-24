import "../Math.gcd/index.ts";

declare global {
  interface Math {
    lcm(a: number, b: number): number;
  }
}

Math.lcm = function (a: number, b: number): number {
  if (a === 0 || b === 0) {
    return 0;
  }

  a = Math.abs(a);
  b = Math.abs(b);
  return (a / Math.gcd(a, b)) * b;
};
