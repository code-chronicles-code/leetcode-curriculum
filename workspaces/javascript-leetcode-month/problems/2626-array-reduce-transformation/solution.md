# 2626. Array Reduce Transformation

[View this Write-up on LeetCode](https://leetcode.com/problems/array-reduce-transformation/solutions/5751796/content/) | [View Problem on LeetCode](https://leetcode.com/problems/array-reduce-transformation/)

> \[!WARNING]\
> This page includes spoilers. For a spoiler-free introduction to the problem, see [the README file](README.md).

## Summary

The solution needs to process all the array elements and pass them through a reducing function. Unlike the [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) built-in we're replicating, we don't have to pass in an index to the reducer function, but order still matters.

Any approach that processes elements in the appropriate order will work well. I'd recommend an iterative solution using a simple loop, though in the context of interview prep it may be worthwhile to become comfortable with recursive implementations.

We can also get accepted by simply using the built-in `.reduce`, since LeetCode doesn't enforce that we don't. Or, we could use [`.reduceRight`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight) instead and claim that it's technically not `.reduce`.

## Background

> \[!TIP]\
> If you've been following [my recommended order for LeetCode's JavaScript problems](https://github.com/code-chronicles-code/leetcode-curriculum/tree/reduce-write-up/workspaces/javascript-leetcode-month) you might have already encountered the following discussion of reducing in [another write-up](../2635-apply-transform-over-each-element-in-array/solution.md). Feel free to skip ahead to the solutions.

### Reducing

If you're a veteran of [functional programming](https://en.wikipedia.org/wiki/Functional_programming) you likely know about the concept of reducing, also known as folding. If not, it's useful to learn, because it's the concept behind popular JavaScript libraries like [Redux](https://redux.js.org/) and the handy [`useReducer` React hook](https://react.dev/reference/react/useReducer).

A full explanation of reducing is beyond the scope of this write-up, but the gist of it is that we can use it to combine some multi-dimensional data in some way, and _reduce_ its number of dimensions. To build up your intuition of this concept, imagine that we have some list of numbers like 3, 1, 4, 1, 5, 9 and we decide to reduce it using the addition operation. That would entail putting a + between adjacent numbers to get 3 + 1 + 4 + 1 + 5 + 9 which reduces the (one-dimensional) list to a single ("zero-dimensional") number, 23. If we were to reduce the list using multiplication instead, we'd get a different result. So the reduce result depends on the operation used.

In the above examples, both addition and multiplication take in numbers, two at a time, and combine them into one. The reduce works by repeatedly applying the operation until there's only one number left. However, the result of a reduce operation doesn't have to be of the same type as the elements of the list. In TypeScript terms, a "reducer" function should satisfy the following signature, using generics:

```typescript []
type Reducer<ResultType, ElementType> = (
  accumulator: ResultType,
  element: ElementType,
) => ResultType;
```

In other words, it should take an "accumulator" of type `ResultType` and an element of type `ElementType` and combine them into a new value of type `ReturnType`, where `ResultType` and `ElementType` will depend on the context. This allows for much more complex operations to be expressed as a reduce. In cases where `ResultType` and `ElementType` are different, we will also need to provide an initial value for the accumulator, so we have a value of type `ResultType` to kick off the reduce -- without an initial value the first step of the reduce is to combine the first two elements of the list, which wouldn't align with the reducer's signature.

The initial value also ensures a meaningful result when trying to reduce an empty list. For example, the sum of an empty list is usually defined to be zero, and we can achieve this by specifying an initial value of zero when expressing summing as a reduce via addition.

## Solutions

It's solution time!

### Using `Array.prototype.reduce`

Let's kick off using the built-ins, for some quick gratification. Delegating to the built-in is very concise in pure JavaScript:

[View submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1378766665/)

```javascript []
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
const reduce = (arr, fn, init) => arr.reduce(fn, init);
```

In TypeScript, let's modify LeetCode's solution template and generalize our function using generics. We'll use one type parameter for the type of the array elements and one for the type of the result, as described in the Background section.

[View submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1378765352/)

```typescript []
const reduce = <TElement, TResult>(
  arr: readonly TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult => arr.reduce(fn, init);
```

We can also get weird. If you're new to JavaScript, please ignore this next solution, it's not meant to be easy to interpret.

[View submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1378767802/)

```javascript []
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
const reduce = Function.prototype.call.bind(Array.prototype.reduce);
```

Understanding why the above works was a bonus question in [another write-up](../2635-apply-transform-over-each-element-in-array/solution.md). Read about it there if you're curious, but otherwise don't worry about this code too much.

### Using `Array.prototype.reduceRight`

For a clearer conscience, we can also go with `.reduceRight`, but we'll have to reverse the array to make sure elements are processed in the appropriate order. The built-in `.reverse` mutates the array it's invoked on, so if we want to avoid mutating the input, we'll have to copy it, using [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) for example.

[View submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1378777231/)

```typescript []
const reduce = <TElement, TResult>(
  arr: readonly TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult => [...arr].reverse().reduceRight(fn, init);
```

We can also use the more recently-added [`.toReversed`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed) to get a reversed copy of the input. The function is available in LeetCode's JavaScript environment, but TypeScript doesn't know that it is, so we'll have to help it out by adding appropriate type definitions to the built-in interfaces for `Array` and `ReadonlyArray`.

[View submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1378778477/)

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

> \[!NOTE]\
> **What would happen if we used `.reduceRight` without reversing?** Can you think of a reducer function that would break? My answer is at the bottom of this write-up.

### Iterative

The iterative solutions are the ones I recommend for this problem, because I think they read quite nicely. For example, a simple `for...of` loop works great, since we don't care about indexes:

[View submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1378776182/)

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

Alternatively, try a `.forEach`:

[View submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1378776438/)

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

If we don't mind mutating the input array, we can also remove elements from it, one by one, and destructively reduce to a result:

[View submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1382531301/)

```typescript []
function reduce<TElement, TResult>(
  arr: TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult {
  let res = init;

  arr.reverse();
  while (arr.length > 0) {
    res = fn(res, arr.pop() as TElement);
  }

  return res;
}
```

Note that we need to help TypeScript understand that `arr.pop()` returns a `TElement` in this case, otherwise TypeScript would worry that it's `TElement | undefined`. Using [TypeScript's non-null assertion operator](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-) (!) wouldn't be entirely accurate if `undefined` is a valid `TElement` (i.e. if the array is allowed to contain `undefined` values).

> \[!NOTE]\
> **Why use `.reverse` and `.pop` instead of `.shift` in the destructive implementation?** The answer is at the bottom of this doc.

### Recursive

In a recursive solution, a nice base case would be an empty array, wherein we can simply return `init`. For non-empty arrays, each recursion step should process one element from the array, removing it, so the array size is reduced by one and we're inching closer to the empty array base case. We annotate the result of the `.shift` just like we did with the `.pop`:

[View submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1382534272/)

```typescript []
const reduce = <TElement, TResult>(
  arr: TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult =>
  arr.length === 0 ? init : reduce(arr, fn, fn(init, arr.shift() as TElement));
```

However, the code above has quadratic time complexity, because we're doing a `.shift` (which is a linear operation) within the linear operation of processing all the array elements. To achieve a linear solution, we should avoid repeatedly removing from the front of the array. We can instead rely on an index to track our progress, defaulting it to 0, so that users of our function aren't forced to provide it:

[View submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1378769940/)

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

Note that adding another argument to the function in this way can be considered polluting the API. One could argue that not only should users of our function not _have_ to provide an index, they shouldn't even be _able_ to, but with the above code they are. We can address this by hiding the index in an inner function:

[View submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1382527902/)

```typescript []
function reduce<TElement, TResult>(
  arr: readonly TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult {
  const doReduce = (accumulator: TResult, index: number): TResult =>
    index === arr.length
      ? accumulator
      : doReduce(fn(accumulator, arr[index]), index + 1);

  return doReduce(init, 0);
}
```

All of the above considerations are why I recommend a simple iterative solution using a `for...of` loop. However, I think we can get an elegant recursive solution (that's still linear in time complexity) by going through our own `reduceRight`. Since we're destroying the input anyway, we don't have to worry that `.reverse` mutates the array it's invoked on:

[View submission on LeetCode](https://leetcode.com/problems/array-reduce-transformation/submissions/1382527405/)

```typescript []
const reduceRight = <TElement, TResult>(
  arr: TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult =>
  arr.length === 0
    ? init
    : reduceRight(arr, fn, fn(init, arr.pop() as TElement));

const reduce = <TElement, TResult>(
  arr: TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult => reduceRight(arr.reverse(), fn, init);
```

## Answers to Bonus Questions

1. **What would happen if we used `.reduceRight` without reversing the array to implement reducing?**

   It would still work correctly some of the time, for example if the reducer is [commutative](https://en.wikipedia.org/wiki/Commutative_property) and [associative](https://en.wikipedia.org/wiki/Associative_property), like summing: `(accumulator, element) => accumulator + element`.

   However, order matters if our reducer doesn't have these properties, for example `(accumulator, element) => 2 * accumulator + element`. Elements that are combined into the accumulator earlier will experience more multiplications by 2:

   ```javascript []
   const reducer = (accumulator, element) => 2 * accumulator + element;
   const arr = [3, 1, 4];

   // The running values with a standard `.reduce` will be:
   // 0
   // 2 * 0 + 3 = 3
   // 2 * (2 * 0 + 3) + 1 = 7
   // 2 * (2 * (2 * 0 + 3) + 1) + 4 = 18
   console.log(arr.reduce(reducer, 0)); // prints 18

   // The running values with a `.reduceRight` will be:
   // 0
   // 2 * 0 + 4 = 4
   // 2 * (2 * 0 + 4) + 1 = 9
   // 2 * (2 * (2 * 0 + 4) + 1) + 3 = 21
   console.log(arr.reduceRight(reducer, 0)); // prints 21
   ```

2. **Why use `.reverse` and `.pop` instead of `.shift` in the destructive iterative implementation?**

   The answer was also discussed in the section on recursive solutions.

   It's a matter of time complexity. Removing from the back of an array is cheaper than removing from the front. As its name highlights, `.shift` involves shifting the entire contents of the array in order to reindex, making it O(N) for an array of size N. By contrast, `.pop` only needs to remove the last element, without impacting the other positions in the array, so its cost is O(1).

   A reverse is also O(N) since it processes the whole array, but we can pay it as a one-time up-front cost, and then we can use exclusively O(1) removes from the back for the rest of the implementation. If we instead did `.shift` within an O(N) loop, the overall complexity would become quadratic.

> \[!TIP\]
> Thanks for reading! If you enjoyed this write-up, feel free to [up-vote it on LeetCode](https://leetcode.com/problems/array-reduce-transformation/solutions/5751796/content/)! 🙏

<!-- TODO: I think it would be nice to include some solutions that allow `init` to be optional, to show how that would work -->
