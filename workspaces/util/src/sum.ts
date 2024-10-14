export function sum(nums: Iterable<number>): number {
  let res = 0;

  for (const num of nums) {
    res += num;
  }

  return res;
}
