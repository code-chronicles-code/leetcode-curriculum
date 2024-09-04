# 2634. Filter Elements from Array

[View this Write-up on LeetCode TODO](https://leetcode.com/problems/filter-elements-from-array/solutions/) | [View Problem on LeetCode](https://leetcode.com/problems/filter-elements-from-array/)

> [!WARNING]  
> This page includes spoilers. For a spoiler-free introduction to the problem, see [the README file](README.md).

## Summary

Not counting ignoring the problem statement and using the [`Array.prototype.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method, we could:

- explicitly iterate through the input, using a classic `for` loop, a `for...of` loop, the `.forEach` method, or even a `for...in` loop (although I don't intend to show `for...in`)
- use [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) to power the iteration
- use recursion

Practically speaking, I think the iterative solutions using simple loops are the best. There's no need to complicate things.

If you're practicing for interviews, I'd also recommend knowing how to do it with `.reduce`, since it's sometimes asked.

## Background

If you've been following [my recommended sequence of JavaScript-themed LeetCode problems](../..), then you solved [2635. Apply Transform Over Each Element in Array](../2635-apply-transform-over-each-element-in-array/) right before solving this problem. The background I shared in [that write-up](../2635-apply-transform-over-each-element-in-array/solution.md) applies here as well.

I also want to explicitly discuss an additional concept, however:

### Conditional Execution

## Solutions

We're now ready to discuss some solutions!

### Using [`Array.prototype.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

As always, it's fun to ignore the demands of the problem statement and get a quick accept. Note that for implementations consisting of one statement, I opted to use arrow function syntax.

[View submission on LeetCode TODO]()

```typescript []
const filter = <T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] => arr.filter(fn);
```

We can also get weird. If you're new to JavaScript, please ignore this next solution, it's not meant to be easy to interpret.

[View submission on LeetCode TODO]()

```javascript []
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
const filter = Function.prototype.call.bind(Array.prototype.filter);
```

Understanding why the above works was a bonus question in [an earlier write-up](../2635-apply-transform-over-each-element-in-array/solution.md). Read about it there if you're curious, but otherwise don't worry about this code too much.

### Iterate and Build

Any of the many ways to iterate over an array will work, for example a classic `for` loop:

[View submission on LeetCode TODO]()

```typescript []
function filter<T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] {
  const res: T[] = [];

  for (let i = 0; i < arr.length; ++i) {
    fn(arr[i], i) && res.push(arr[i]);
  }

  return res;
}
```

A `.forEach`:

[View submission on LeetCode TODO]()

```typescript []
function filter<T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] {
  const res: T[] = [];

  arr.forEach((element, index) => {
    fn(element, index) && res.push(element);
  });

  return res;
}
```

And even a `for...of` loop, using [`.entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries) to have access to the index:

[View submission on LeetCode TODO]()

```typescript []
function filter<T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] {
  const res: TOut[] = [];

  for (const [index, element] of arr.entries()) {
    fn(element, index) && res.push(element);
  }

  return res;
}
```

However, as I mentioned in [another write-up](../2677-chunk-array/solution.md), I consider it a code smell to build an array through repeated, conditional `.push` in a loop. It's begging to be replaced with a `.filter`! Since this is the implementation of `.filter` maybe it's the one place where the repeated `.push` pattern is forgivable. But we can also pretend we're not using that pattern by using a generator and converting it to an array in one statement:

[View submission on LeetCode TODO]()

```typescript []
function* lazyFilter<T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): Generator<T, void, void> {
  for (const [index, element] of arr.entries()) {
    fn(element, index) && yield element;
  }
}

const filter = <T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): TOut[] => Array.from(lazyFilter(arr, fn));
```

### Using [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

Some companies like asking candidates to implement other operations using only `.reduce`, so let's practice doing so.

Implementing mapping using [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) looks satisfying, and follows the functional programming principle of immutability, but the downside is that we are re-copying the result each time, so this solution has quadratic complexity. However it still gets accepted by LeetCode because of the small input sizes:

[View submission on LeetCode TODO]()

```typescript []
const filter = <T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] =>
  arr.reduce(
    (res: T[], element, index) =>
      fn(element, index) ? [...res, element] : res,
    [],
  );
```

For linear complexity, we should always reuse the same array for each step, mutating it if appropriate:

[View submission on LeetCode TODO]()

```typescript []
const filter = <T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] =>
  arr.reduce((res: T[], element, index) => {
    fn(element, index) && res.push(element);
    return res;
  }, []);
```

If you're a contrarian, you may prefer to [`.reduceRight`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight) and [`.reverse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse):

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377344271/)

```typescript []
const filter = <T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] =>
  arr
    .reduceRight((res: T[], element, index) => {
      fn(element, index) && res.push(element);
      return res;
    }, [])
    .reverse();
```

> [!NOTE]  
> **Instead of `.reverse`, why not replace the `.push` with [`.unshift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)?** The answer is at the bottom of the doc.

You might also see code like the following, using the somewhat obscure [comma operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_operator) to keep the body of the arrow function "one statement". I don't encourage this practice, but then again I don't encourage `.reduce` to begin with:

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377344634/)

```typescript []
const filter = <T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] =>
  arr.reduce(
    (res: T[], element, index) => (
      fn(element, index) && res.push(element), res
    ),
    [],
  );
```

Note that throughout these solutions, we annotated _one_ of the arguments of the reducer function, specifically the accumulator, to help TypeScript understand that we'll end up with a `T[]`.

> [!TIP]  
> After learning `.reduce`, many programmers seem compelled to use it everywhere. I think `.reduce` is neat, but I find that it can often _reduce_ readability as well. We often have to trade off between code elegance and efficiency, as in the first example that used spread syntax. In such cases, let's resist the urge to show off with `.reduce` and stick to regular loops. I think `.reduce` is best when the reducer's `ElementType` and `ReturnType` (to reuse the type names from the Background section) are the same. So keep using `arr.reduce((a, b) => a + b, 0)` to sum arrays, but use it sparingly for more complex operations.

### Using Other Built-Ins

TODO: flatMap

### Recursion

Although I like recursion, I don't think there's a good reason to use it in this problem, when iteration with simple loops works so well. But to make this write-up more comprehensive, here's a recursive solution, using an inner arrow function so that `arr` and `fn` are in scope without us having to explicitly pass them around:

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377324948/)

```typescript []
function map<TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] {
  const res: TOut[] = [];

  const doMap = (index: number) => {
    if (index === arr.length) {
      return;
    }

    res.push(fn(arr[index], index));
    doMap(index + 1);
  };

  doMap(0);

  return res;
}
```

We don't necessarily need an `index` argument, we can also use the size of the result so far:

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377325373/)

```typescript []
function map<TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] {
  const res: TOut[] = [];

  const doMap = () => {
    if (res.length === arr.length) {
      return;
    }

    res.push(fn(arr[res.length], res.length));
    doMap();
  };

  doMap();

  return res;
}
```

And, we can even merge the inner function into the main function, by using an additional argument with a [default value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters). I don't love this because it pollutes the interface of our function, but it works:

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377325862/)

```typescript []
function map<TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
  res: TOut[] = [],
): TOut[] {
  if (res.length === arr.length) {
    return res;
  }

  res.push(fn(arr[res.length], res.length));
  return map(arr, fn, res);
}
```

## Answers to Bonus Questions

> [!TIP]  
> Thanks for reading! If you enjoyed this write-up, feel free to [up-vote it on LeetCode TODO]()! 🙏
