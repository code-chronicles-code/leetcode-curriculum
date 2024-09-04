# 2626. Array Reduce Transformation

[View this Write-up on LeetCode TODO](https://leetcode.com/problems/array-reduce-transformation/solutions/) | [View Problem on LeetCode](https://leetcode.com/problems/array-reduce-transformation/)

> [!WARNING]  
> This page includes spoilers. For a spoiler-free introduction to the problem, see [the README file](README.md).

## Summary

## Background

## Solutions

### Using `Array.prototype.reduce`

[View Submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1378766665/)

```javascript []
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
const reduce = (arr, fn, init) => arr.reduce(fn, init);
```

[View Submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1378765352/)

```typescript []
const reduce = <TElement, TResult>(
  arr: readonly TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult => arr.reduce(fn, init);
```

[View Submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1378767802/)

```javascript []
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
const reduce = Function.prototype.call.bind(Array.prototype.reduce);
```

[View Submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1378777231/)

```typescript []
const reduce = <TElement, TResult>(
  arr: readonly TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult => [...arr].reverse().reduceRight(fn, init);
```

[View Submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1378778477/)

```typescript []
declare global {
  interface Array<T> {
    toReversed(this: T[]): T[];
  }

  interface ReadonlyArray<T> {
    toReversed(this: readonly T[]): T[];
  }
}

const reduce = <TElement, TResult>(
  arr: readonly TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult => arr.toReversed().reduceRight(fn, init);
```

### Iterative

[View Submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1378776182/)

```typescript []
function reduce<TElement, TResult>(
  arr: readonly TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult {
  let res = init;

  for (const element of arr) {
    res = fn(res, element);
  }

  return res;
}
```

[View Submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1378776438/)

```typescript []
function reduce<TElement, TResult>(
  arr: readonly TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult {
  let res = init;

  arr.forEach((element) => {
    res = fn(res, element);
  });

  return res;
}
```

[View Submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1378781727/)

```typescript []
function reduce<TElement, TResult>(
  arr: TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult {
  let res = init;

  arr.reverse();
  while (arr.length > 0) {
    res = fn(res, arr.pop());
  }

  return res;
}
```

### Recursive

[View Submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1378782688/)

```typescript []
const reduce = <TElement, TResult>(
  arr: TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult =>
  arr.length === 0 ? init : reduce(arr, fn, fn(init, arr.shift()));
```

[View Submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1378769940/)

```typescript []
const reduce = <TElement, TResult>(
  arr: readonly TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
  index: number = 0,
): TResult =>
  index === arr.length
    ? init
    : reduce(arr, fn, fn(init, arr[index]), index + 1);
```

[View Submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1378772700/)

```typescript []
function reduce<TElement, TResult>(
  arr: readonly TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult {
  const doReduce = (accumulator: TResult, index: number) =>
    index === arr.length
      ? accumulator
      : doReduce(fn(accumulator, arr[index]), index + 1);
  return doReduce(init, 0);
}
```

## Answers to Bonus Questions

> [!TIP]  
> Thanks for reading! If you enjoyed this write-up, feel free to [up-vote it on LeetCode TODO](https://leetcode.com/problems/array-reduce-transformation/solutions/)! 🙏
