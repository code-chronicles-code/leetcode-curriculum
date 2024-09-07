# 2724. Sort By

[View this Write-up on LeetCode](https://leetcode.com/problems/sort-by/solutions/5739885/content/) | [View Problem on LeetCode](https://leetcode.com/problems/sort-by/)

> [!WARNING]  
> This page includes spoilers. For a spoiler-free introduction to the problem, see [the README file](README.md).

## Summary

There are two built-in functions we could use, either [`Array.prototype.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) or [`Array.prototype.toSorted`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted). The latter is better if we don't want to modify the input, although we could also use the former after first copying the input.

If `fn` (the function that computes the "sort key") is expensive, we can make sure it's invoked at most once per element of the input. Some options are:

- map the input into records or tuples of the sort key and the original element, sort, then map back
- memoize `fn`, using either a library function like [Lodash](https://lodash.com/)'s [`memoize`](https://lodash.com/docs/#memoize) (which is available in the LeetCode environment) or our own cache

If we wish to treat this problem as an algorithmic problem rather than an API knowledge problem, we can also get accepted by implementing our own sorting algorithm.

## Background

### Sorting in JavaScript

Like most modern programming languages, JavaScript comes with a built-in function for sorting, the `.sort` method of array objects. Although nowadays JavaScript is being used for all kinds of applications, it seems that its early API design expected that programmers would need to sort strings more often than numbers. If the desired comparison method is not specified, `.sort` will do a _string_ comparison on the array elements, leading to hilarious results. For example:

```javascript []
const arr = [5, 12, 37, 3];
arr.sort();
console.log(arr); // prints [ 12, 3, 37, 5 ]
```

It's therefore essential to specify a custom comparator that's appropriate for the kind of elements you want to sort.

> [!NOTE]  
> **What would the array `[{digit: 3}, {digit: 1}, {digit: 4}]` become after we invoke `.sort` on it with no arguments?** Try it in your browser's JavaScript console! The answer is at the bottom of this doc.

A custom comparator in JavaScript is very similar to a [`Comparator`](<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Comparator.html#compare(T,T)>) in Java. It's a function object that takes in two array elements and is expected to return a number, based on the following contract:

- **a negative number** means the first element passed in is "smaller", i.e. should be ordered before the second one
- **a positive number** means the first element passed in is "bigger", i.e. should be ordered after the second one
- **zero** means the two elements are equal according to the sort criteria

A lot of people read about this contract and then write code like this:

```javascript []
function numericCompare(a, b) {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}

const arr = [5, 12, 37, 3];
arr.sort(numericCompare);
console.log(arr); // prints [ 3, 5, 12, 37 ], yay!
```

For some reason "a negative number" becomes -1 in their code and "a positive number" becomes 1. There's nothing in the contract requiring -1 and 1, we could just as well return -2 and 2, or any other numbers. The contract only cares about the _sign_ of the result, not its magnitude. That's why I recommend writing the `numericCompare` function more concisely:

```javascript []
function numericCompare(a, b) {
  return a - b;
}
```

Let's quickly confirm that it respects the contract: if a < b, then a - b will be a negative number; if a > b, then a - b will be a positive number; and if a = b, then a - b = 0. It works!

Using this principle, writing a custom comparator becomes simple enough to inline most of the time, usually using an arrow function expression:

```javascript []
const arr = [5, 12, 37, 3];
arr.sort((a, b) => a - b);
console.log(arr); // prints [ 3, 5, 12, 37 ], yay!
```

Sorting objects by some numeric property can also use the subtraction idiom, for example let's sort some strings by their length:

```javascript []
const arr = ["Alice", "Bob", "Charlie"];
arr.sort((a, b) => a.length - b.length);
console.log(arr); // prints [ "Bob", "Alice", "Charlie" ]
```

And to reverse the sort order, invert the sign of the comparator by inverting the subtraction:

```javascript []
const arr = [5, 12, 37, 3];
arr.sort((a, b) => b - a);
console.log(arr); // prints [ 37, 12, 5, 3 ]
```

> [!NOTE]  
> Can you think of a concise way to break ties in a custom comparator? **How would we sort an array of _x_ and _y_ coordinates first by _x_ in increasing order, breaking ties by _y_ in decreasing order?** An answer is included at the bottom of this doc.

### Regarding API Design

Some APIs return a new value. Some APIs mutate their argument. [`Array.prototype.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) unfortunately does both -- it mutates the array it's invoked on, but it also returns it. This makes it convenient to chain `.sort` with other array methods, but unfortunately it also results in code like this:

```javascript []
const arr = [3, 1, 4];
const sortedArr = arr.sort((a, b) => a - b);
```

Can you spot the potential confusion? The code reads as if the developer expected `.sort` to return a sorted copy of `arr`, but in fact `arr` and `sortedArr` both refer to exactly the same object! That's because `.sort` mutated `arr` in-place, and then additionally returned it! Misconceptions like this could lead to bugs, if the developer thought that `arr` still contains the data in its non-sorted state.

> [!TIP]  
> If you're using TypeScript, default to annotating array data that you don't intend to mutate as `readonly`. You'll get a type error if you accidentally invoke a mutating method on such an array, like `.push`, `.pop`, or `.sort`.

For a `.sort` API that mutates in-place, I would prefer that it didn't return anything. It could be less convenient in some cases, but it's less likely to be misused. Python got this right: the [`sorted`](https://docs.python.org/3/library/functions.html#sorted) function returns a new, sorted list, whereas the [`.sort`](https://docs.python.org/3/library/stdtypes.html#list.sort) method of list objects mutates in-place and doesn't return anything. I'll therefore often choose to deliberately not use the return value of JavaScript's `.sort`, unless it's especially convenient. (Today's problem might be one of those cases wherein being able to sort and return in one statement does feel very nice.)

> [!TIP]  
> When you design APIs, I hope you'll pick to either return new data, or mutate the input, but not both. Be clear on how you'd like your API to be used!

Note that for cases when you don't want to mutate the original array, the latest JavaScript spec includes a [`.toSorted`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted) method that returns a sorted copy.

[`Array.prototype.reverse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) suffers from the same flaw of both modifying the array it's invoked on and also returning it. You can use the recently added [`.toReversed`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed) to get a reversed copy of an array.

## Solutions

Let's write some!

### Using `Array.prototype.sort`

If we don't mind mutating the input, we can write a single expression, using the subtraction idiom for the custom comparator function:

[View submission on LeetCode](https://leetcode.com/problems/sort-by/submissions/1378429436/)

```javascript []
/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
const sortBy = (arr, fn) => arr.sort((a, b) => fn(a) - fn(b));
```

For TypeScript, I opted to use generics and get rid of the `JSONValue` junk from LeetCode's default template. We don't have to limit ourselves to JSON, we can handle anything as long as our input array and `fn` are in sync!

[View submission on LeetCode](https://leetcode.com/problems/sort-by/submissions/1378760710/)

```typescript []
const sortBy = <T>(arr: T[], fn: (value: T) => number): T[] =>
  arr.sort((a, b) => fn(a) - fn(b));
```

Since the problem is asking us to _return_ a sorted array, by the principle of either mutating or returning but not both, I think we should favor not modifying the input, and marking it `readonly` in TypeScript. We can still use `.sort` if we first make a copy of the input, for example using [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax):

[View submission on LeetCode](https://leetcode.com/problems/sort-by/submissions/1378760479/)

```typescript []
const sortBy = <T>(arr: readonly T[], fn: (value: T) => number): T[] =>
  [...arr].sort((a, b) => fn(a) - fn(b));
```

### Using `Array.prototype.toSorted`

The code will look very similar to the code using `.sort`:

[View submission on LeetCode](https://leetcode.com/problems/sort-by/submissions/1378760265/)

```javascript []
/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
const sortBy = (arr, fn) => arr.toSorted((a, b) => fn(a) - fn(b));
```

Curiously, although LeetCode's JavaScript environment supports the `.toSorted` method, at the time of this writing, LeetCode's TypeScript config isn't aware that this method exists. So we have to inform TypeScript that it does, by declaring it!

[View submission on LeetCode](https://leetcode.com/problems/sort-by/submissions/1378759820/)

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

Note that `ReadonlyArray` and `Array` are distinct interfaces. That's one way TypeScript can prevent mutation of arrays: a `ReadonlyArray` is simply missing the definitions of mutating methods! Since `.toSorted` is a non-mutating method, it exists on both interfaces.

### Minimizing Calls to `fn`

If the function we use to compute the "sort key", `fn`, is especially expensive, it might be a good idea to limit how much we invoke it. The best we can theoretically do is _O(N)_ invocations, where _N_ is the size of the array. If there are lots of duplicated elements we can account for that as well, but in general any better than once per element is impossible. (How can we sort correctly without computing where each element should go?)

From a time complexity perspective, this isn't that exciting, since a good `.sort` should have a time complexity of _O(N log N)_, so we're talking about reducing the number of invocations of `fn` by a factor of _O(log N)_. We'd need a rather large _N_ for _O(log N)_ to be meaningful. But practically speaking, it might make a difference, and any constant factors might also come into play. You'll have to measure it for your use case!

For now, let's assume that it's a good idea to minimize calls to `fn` and see some ways to do it. One option is to transform the input so that `fn` has already been computed, once and only once, for each element. The sorting step can then be done using simple look-ups. We'll just have to re-map the data before returning it.

The code below uses a JavaScript object (a record) to group each element with its sort key. The braces in `({ element }) => element` are a [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).

[View submission on LeetCode](https://leetcode.com/problems/sort-by/submissions/1378759536/)

```typescript []
const sortBy = <T>(arr: readonly T[], fn: (value: T) => number): T[] =>
  arr
    .map((element) => ({ element, sortKey: fn(element) }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ element }) => element);
```

> [!NOTE]  
> **How come TypeScript allowed us to use `.sort` in the above solution when the input is marked `readonly`?** The answer is at the bottom of this doc.

Instead of records, we could have used tuples. JavaScript doesn't have an explicit tuple data type, but arrays are often used as tuples. An explicit [tuple type annotation](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types) helps TypeScript distinguish it from some other kind of array, and the square brackets in `([element]) => element` are once again a [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).

[View submission on LeetCode](https://leetcode.com/problems/sort-by/submissions/1378759168/)

```typescript []
const sortBy = <T>(arr: readonly T[], fn: (value: T) => number): T[] =>
  arr
    .map((element): [T, number] => [element, fn(element)])
    .sort((a, b) => a[1] - b[1])
    .map(([element]) => element);
```

Instead of explicit pre-computing via `.map`, we can give `fn` a caching wrapper. Memoization is incredibly common in JavaScript code, and on LeetCode we have access to a [`memoize`](https://lodash.com/docs/#memoize) helper through [Lodash](https://lodash.com/). (In the future we'll also implement our own, in problems like [2623. Memoize](https://leetcode.com/problems/memoize/).)

[View submission on LeetCode](https://leetcode.com/problems/sort-by/submissions/1378433879/)

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

We can also implement our own bespoke caching wrapper, using a [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). It's important to go with a `Map` instead of a plain JavaScript object as a map, because we don't know what type of data the input array might hold. JavaScript objects are adequate maps primarily when working with string keys. For arbitrary keys, we can't assume unique stringifications.

[View submission on LeetCode](https://leetcode.com/problems/sort-by/submissions/1378432975/)

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

### Implementing a Sort Algorithm

Although I think the intent of the problem was to teach us about how to `.sort` with a custom comparator, we can also choose to treat it as an algorithmic problem and implement our own sort. For example, here's a (not particularly optimized) [merge sort](https://en.wikipedia.org/wiki/Merge_sort):

[View submission on LeetCode](https://leetcode.com/problems/sort-by/submissions/1378430770/)

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

### Absolutely Refusing to Specify a Custom Comparator

I couldn't resist also including a fun hack as a bonus solution. Since the problem clearly wants us to `.sort` with a custom comparator function, could we somehow get default `.sort` to do the right thing? It turns out we can...

[View submission on LeetCode](https://leetcode.com/problems/sort-by/submissions/1379421195/)

```typescript []
const sortBy = <T>(arr: T[], fn: (value: T) => number): T[] =>
  arr
    .map((element) => `${1.1e10 + fn(element)} ${JSON.stringify(element)}`)
    .sort()
    .map((sortKeyAndElement) =>
      JSON.parse(sortKeyAndElement.replace(/^\d+ /, "")),
    );
```

> [!NOTE]  
> **How does this solution work?** Hint: It packs the original data and its sort key into a string, then decodes the original data after sorting. But how do we get strings that will naturally sort in the correct order? The answer is at the bottom of the doc.

## Answers to Bonus Questions

1. **What would the array `[{digit: 3}, {digit: 1}, {digit: 4}]` become after a `.sort` with no arguments?**

   It's a bit of a trick question! It would remain unchanged. That's because unless we override it, an object in JavaScript gets stringified to `"[object Object]"`. So all three array elements will get stringified to the same thing and be considered equal as far as the comparison is concerned. Since `.sort` is expected to be a _stable_ sorting algorithm, "equal" elements maintain their relative order in the sorted result. So nothing moves.

<!-- prettier-ignore-start -->
2. **How would we sort an array of _x_ and _y_ coordinates first by _x_ in increasing order, breaking ties by _y_ in decreasing order?**

   We can take advantage of the fact that 0 is a falsy value in JavaScript:

   <!-- Prettier will try to remove some parentheses that I'd like to keep for clarity. -->
   ```js
   const arr = [
     { x: 5, y: 2 },
     { x: 3, y: -1 },
     { x: 3, y: 0 },
   ];
   arr.sort((a, b) => (a.x - b.x) || (b.y - a.y));
   console.log(arr); // prints [ { x: 3, y: 0 }, { x: 3, y: -1 }, { x: 5, y: 2 } ]
   ```

   When the two _x_ coordinates are zero, the `||` will compute and return the _y_ comparison.

<!-- prettier-ignore-end -->

3. **Why did TypeScript seemingly allow us to use `.sort` in a solution with a `readonly` input?**

   We should look at the code carefully! The `.sort` is not invoked directly on the input, but chained after a `.map`:

   ```typescript []
   const sortBy = <T>(arr: readonly T[], fn: (value: T) => number): T[] =>
     arr
       .map((element) => ({ element, sortKey: fn(element) }))
       .sort((a, b) => a.sortKey - b.sortKey)
       .map(({ element }) => element);
   ```

   Whenever we `.map` (or `.filter`) we're creating a new array, and that array is no longer `readonly`. The input is not mutated by this code.

4. **How can we get a solution that uses a default `.sort` to work?**

   Here's the code again for convenience:

   ```typescript []
   const sortBy = <T>(arr: T[], fn: (value: T) => number): T[] =>
     arr
       .map((element) => `${1.1e10 + fn(element)} ${JSON.stringify(element)}`)
       .sort()
       .map((sortKeyAndElement) =>
         JSON.parse(sortKeyAndElement.replace(/^\d+ /, "")),
       );
   ```

   Since the default `.sort` works on strings, we need to replace our array with strings that will naturally be ordered based on the output of `fn`. The basic idea is to create strings that encode the output of `fn` and the data itself, separated with a space. Since LeetCode promised us JSON data, we can use `JSON.stringify` to encode and `JSON.parse` later recover the elements.

   But just concatenating via space is not enough! If `fn` returns 100 for some array element and 12 for another, building the strings naively would give us `"100 <some JSON>"` and `"12 <some JSON>"`, and the string with 100 will be ordered first! To address this, we add `1.1e10` to the result of `fn` -- this is another way of expressing the number 11,000,000,000. Then, in the 100 and 12 example, the strings will become `"11000000100 <some JSON>"` and `"11000000012 <some JSON>"` which will now sort correctly. The reason for `1.1e10` instead of just `1e10` is so we can handle negative outputs from `fn`. If `fn` returns -1, we'll get the string `"10999999999 <some JSON>"` which will also be ordered correctly!

   Overall, this assumes that `fn` will return an integer between -1,000,000,000 and 1,000,000,000 inclusive, which happened to work on all of LeetCode's test cases. If we needed to handle floating point values, or a greater range of numbers, we could have gone for a more elaborate hack.

> [!TIP]  
> Thanks for reading! If you enjoyed this write-up, feel free to [up-vote it on LeetCode](https://leetcode.com/problems/sort-by/solutions/5739885/content/)! 🙏
