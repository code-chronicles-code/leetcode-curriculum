# 2724. Sort By

[View this Write-up on LeetCode TODO](https://leetcode.com/problems/sort-by/solutions/) | [View Problem on LeetCode](https://leetcode.com/problems/sort-by/)

> [!WARNING]  
> This page includes spoilers. For a spoiler-free introduction to the problem, see [the README file](README.md).

## Summary

## Background

## Solutions

### Using `Array.prototype.sort`

[View Submission on LeetCode](https://leetcode.com/problems/sort-by/submissions/1378429436/)

```javascript []
/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
const sortBy = (arr, fn) => arr.sort((a, b) => fn(a) - fn(b));
```

[View Submission on LeetCode TODO]()

```typescript []
const sortBy = <T>(arr: T[], fn: (value: T) => number): T[] =>
  arr.sort((a, b) => fn(a) - fn(b));
```

[View Submission on LeetCode TODO]()

```typescript []
const sortBy = <T>(arr: readonly T[], fn: (value: T) => number): T[] =>
  [...arr].sort((a, b) => fn(a) - fn(b));
```

### Using `Array.prototype.toSorted`

[View Submission on LeetCode TODO]()

```javascript []
/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
const sortBy = (arr, fn) => arr.toSorted((a, b) => fn(a) - fn(b));
```

[View Submission on LeetCode TODO]()

```typescript []
declare global {
  interface Array<T> {
    toSorted(this: T[], compareFn: (a: T, b: T) => number): T[];
  }

  interface ReadonlyArray<T> {
    toSorted(this: readonly T[], compareFn: (a: T, b: T) => number): T[];
  }
}

const sortBy = <T>(arr: readonly T[], fn: (value: T) => number): T[] =>
  arr.toSorted((a, b) => fn(a) - fn(b));
```

### Minimizing Calls to `fn`

[View Submission on LeetCode TODO]()

```typescript []
const sortBy = <T>(arr: readonly T[], fn: (value: T) => number): T[] =>
  arr
    .map((element) => ({ element, sortKey: fn(element) }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ element }) => element);
```

[View Submission on LeetCode TODO]()

```typescript []
const sortBy = <T>(arr: readonly T[], fn: (value: T) => number): T[] =>
  arr
    .map((element): [T, number] => [element, fn(element)])
    .sort((a, b) => a[1] - b[1])
    .map(([element]) => element);
```

[View Submission on LeetCode](https://leetcode.com/problems/sort-by/submissions/1378433879/)

```javascript []
/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
function sortBy(arr, fn) {
  const memoizedFn = _.memoize(fn);
  return arr.toSorted((a, b) => memoizedFn(a) - memoizedFn(b));
}
```

[View Submission on LeetCode](https://leetcode.com/problems/sort-by/submissions/1378432975/)

```typescript []
function sortBy<T>(arr: readonly T[], fn: (value: T) => number): T[] {
  const cache = new Map<T, number>();
  const getSortKey = (value: T): number => {
    let res = cache.get(value);
    if (res == null) {
      res = fn(value);
      cache.set(value, res);
    }
    return res;
  };

  return [...arr].sort((a, b) => getSortKey(a) - getSortKey(b));
}
```

### Implementing Own Sort

[View Submission on LeetCode](https://leetcode.com/problems/sort-by/submissions/1378430770/)

```typescript []
function sortBy<T>(arr: readonly T[], fn: (value: T) => number): T[] {
  const n = arr.length;
  if (n <= 1) {
    return [...arr];
  }

  const middleIndex = Math.floor(n / 2);
  const firstHalf = sortBy(arr.slice(0, middleIndex), fn);
  const secondHalf = sortBy(arr.slice(middleIndex), fn);

  const res: T[] = [];

  let firstHalfCursor = 0;
  let secondHalfCursor = 0;
  while (
    firstHalfCursor < firstHalf.length &&
    secondHalfCursor < secondHalf.length
  ) {
    res.push(
      fn(firstHalf[firstHalfCursor]) <= fn(secondHalf[secondHalfCursor])
        ? firstHalf[firstHalfCursor++]
        : secondHalf[secondHalfCursor++],
    );
  }
  res.push(
    ...firstHalf.slice(firstHalfCursor),
    ...secondHalf.slice(secondHalfCursor),
  );

  return res;
}
```

## Answers to Bonus Questions

> [!TIP]  
> Thanks for reading! If you enjoyed this write-up, feel free to [up-vote it on LeetCode TODO](https://leetcode.com/problems/sort-by/solutions/)! 🙏
