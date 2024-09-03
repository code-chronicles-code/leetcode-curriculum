# 2727. Is Object Empty

[View this Write-up on LeetCode](https://leetcode.com/problems/is-object-empty/solutions/5722608/content/) | [View Problem on LeetCode](https://leetcode.com/problems/is-object-empty/)

> [!WARNING]
> This page includes spoilers. For a spoiler-free introduction to the problem, see [the README file](README.md).

## Summary

We can always use `.length` on an array input, and we can use [`Array.isArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) to identify arrays. So the interesting part is how to handle non-array objects, and there are a few options:

- transforming non-array objects into arrays using any of [`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys), [`Object.values`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values), or [`Object.entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
- stringifying using [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) and comparing against `"{}"`
- using a [`for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) loop

The loop approach is the best, because we can return early, without attempting to turn the entirety of a large object into an array or string.

## Background

### Testing for Array-ness

JavaScript has an [`instanceof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) operator, and `Array` _is_ a class. Does that mean we could do `obj instanceof Array`? In this problem, yes! However, the recommended way to check for array-ness is [`Array.isArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray).

I think you can guess what the bonus question is going to be.

> [!NOTE]  
> **What's the difference between `obj instanceof Array` and `Array.isArray(obj)`?** Major props if you know this one. Answer is at the bottom of the doc!

### Objects

You may be wondering why JavaScript even calls them objects. If you're familiar with Python or Ruby, the syntax and behavior of a JavaScript object may remind you of a dictionary or a "hash". Indeed, behaving like a hash map, or collection of key-value pairs, _is_ one of the ways JavaScript objects are used.

The other is more akin to a [`struct`](<https://en.wikipedia.org/wiki/Struct_(C_programming_language)>) in C or C++, i.e. a data structure with fixed fields thay may have heterogenous values. For example:

```javascript []
const pet = { name: "Spot", age: 3 };
```

Perhaps JavaScript wanted to emphasize the `struct` nature of objects, and the use of objects as maps of keys and values emerged afterwards? This hypothesis is consistent with JavaScript objects not having a `length` property -- the "length" of a `struct` is not an interesting concept in the way the size of a map would be.

It's worth noting that JavaScript objects come with a lot of syntactic sugar. For example, the dot-notation for property access is simply a shorthand for accessing via square brackets and string literals (although the square brackets syntax also accepts more complex expressions):

```javascript []
console.log(pet.age); // prints 3, if `pet` is the object defined above
console.log(pet["age"]); // accesses the same property
console.log(pet["AGE".toLowercase()]); // also accesses the same property
```

Another piece of sugar worth knowing relates to object literals:

```javascript []
const name = "Spot";
console.log({ name: name, age: 3 }); // prints { name: "Spot", age: 3 }
console.log({ name, age: 3 }); // also prints { name: "Spot", age: 3 }
```

In other words, when we want to define a property to the same value as a variable with the same name, we can just put the variable name within the object literal braces.

Because manipulating JavaScript objects can be so concise, you'll find they are used extremely often for grouping pieces of related data into data records. Maybe the name does make some sense.

### Turning Objects into Arrays

If we want to use the array `length` property to solve the problem, one approach would be to turn non-array objects into arrays using [`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys), [`Object.values`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values), or [`Object.entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries). All of these will work for us, with `Object.entries` perhaps being the most wasteful since it has to allocate arrays not only for the collection as a whole but also for each individual key-value pair. `Object.keys` may be the cheapest since it doesn't have to try to access the values.

If you're experienced with JavaScript you probably knew all of that already, but do you know the answer to these bonus questions?

> [!NOTE]  
> **What happens if `Object.keys` or its friends is invoked with an array argument?** Since an array is still an object, and more generally since JavaScript is often forgiving, we can assume it probably wouldn't crash, but does it do anything useful?

> [!NOTE]  
> **What about [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from), can we use it to turn an object into an array?** It was mentioned when discussing the `arguments` object in [another write-up](../2703-return-length-of-arguments-passed/solution.md), but what does it do on an arbitrary object? Try it!

Answers will be at the bottom of this doc!

### JSON

If we don't want to convert objects to arrays, another option is to convert them to strings. Even if you haven't actively coded in JavaScript before, you've probably encountered JSON data.

The problem statement mentions one API related to JSON, namely [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse). This gives us a clue regarding where we might find a function for converting objects to strings, and it's in the same namespace, specifically [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).

I don't have anything else to add regarding JSON at this time. If you want to learn more, read the linked docs, or check out the [JSON website](https://www.json.org/)!

### Looping Over Objects

A downside of `Object.keys` and friends is that they loop over an entire object and allocate new arrays. On the bright side, at least it's a shallow loop. `JSON.stringify` has to traverse the entire data structure deeply in order to stringify it!

This probably sounds like a lot of work just to check if an object is empty, and it is. Let's use a loop that will let us return early as soon as we know whether the object is empty or not. JavaScript supports a few different looping constructs, but the one we'll use today is [`for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in), which loops over the _names_ of the properties of an object:

```javascript []
for (const property of obj) {
  console.log({ name: property, value: obj[property] });
}
```

> [!WARNING]  
> In JavaScript, properties can also be inherited via an object's "prototype chain", which is how JavaScript implements classes and inheritance. When iterating over an object's properties we usually only care about its _own_ properties. It's therefore common in `for...in` loops to check ownership of the property, using [`Object.hasOwn`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn) for example. Some codebases avoid `for...in` altogether for this reason and instead take the cost of `Object.keys` which only includes the object's own properties. If we intend to iterate over all (or a majority of) the object's properties, the additional cost of `Object.keys` is primarily one of allocating an additional array, which may be negligible in most applications.

Although we won't need it for today, I also want to mention that for looping over arrays we typically don't use `for...in`, we instead use [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of), which loops over the values of an iterable source.

> [!NOTE]  
> **What happens if we use `for...in` on an array?** Open the JavaScript console in your browser's developer tools and try it! Answer is at the bottom of the doc.

### Type Annotations for Objects

Before we talk about solutions to the problem I want to mention TypeScript annotations for object types. For an object used as a `struct`, we can define a type with a syntax similar for object literals, except that the values must themselves be types. Recursive definitions are allowed! Here's a possible definition for a linked list node type:

```typescript []
type LinkedListNode = { value: number; next?: LinkedListNode };
```

Careful readers will also notice that we can add a question mark before the colon. This means that property is optional.

When an object is used as a map of keys and values, there are a couple of ways to express the type, but the one I'll mention today is [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type). For example `Record<string, number>` would mean an object whose keys are strings and whose values are numbers.

The code provided by LeetCode for this problem once again uses an overly-complicated type. We don't care what type of values are in the object, we can accept anything. So I intend to replace the value type with `unknown`. We also don't care about the key type, either, so perhaps we should use `Record<unknown, unknown>` to mean any kind of object? That won't work unfortunately, because JavaScript objects aren't true hash maps, so they don't accept arbitrary key types. Object keys in JavaScript are usually strings, so `Record<string, unknown>` would be a reasonable type annotation. If we wanted to generalize it, we could use `Record<PropertyKey, unknown>`. The `PropertyKey` type which ships with TypeScript means "anything that can be a property key".

> [!NOTE]  
> **What happens if we use `Record<unknown, unknown>`?** Try it in LeetCode! Answer is... you guessed it, at the bottom of the doc.

## Solutions

Let's apply this knowledge and write some solutions!

### Using `Object.keys`

I didn't mention conditional execution in the background section, but if you're new to JavaScript know that it supports `if` statements, using the same syntax as C, C++, Java, and many other languages:

[View submission on LeetCode](https://leetcode.com/problems/is-object-empty/submissions/1375713791/)

```javascript []
/**
 * @param {Object|Array} obj
 * @return {boolean}
 */
function isEmpty(obj) {
  if (Array.isArray(obj)) {
    return obj.length === 0;
  } else {
    return Object.keys(obj).length === 0;
  }
}
```

Although I normally advocate for early returns, I decided to use an explicit `else` above to put arrays and non-array objects on equal footing for this problem. Below is the TypeScript equivalent, with updated types, as promised. Since it's only used in one spot, I inlined the type. I also marked the argument as read-only. For non-array objects, I used [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype).

[View submission on LeetCode](https://leetcode.com/problems/is-object-empty/submissions/1375714232/)

```typescript []
function isEmpty(
  obj: Readonly<Record<PropertyKey, unknown>> | readonly unknown[],
): boolean {
  if (Array.isArray(obj)) {
    return obj.length === 0;
  } else {
    return Object.keys(obj).length === 0;
  }
}
```

If you're wondering what's up with the triple `=`, that's the [strict equality operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality). It should be preferred over [its looser counterpart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality) in modern code, because we want to be intentional and explicit when it comes to converting types.

JavaScript also supports a [ternary conditional operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator), again reusing the syntax of many other languages:

[View submission on LeetCode](https://leetcode.com/problems/is-object-empty/submissions/1375714595/)

```typescript []
function isEmpty(
  obj: Readonly<Record<PropertyKey, unknown>> | readonly unknown[],
): boolean {
  return Array.isArray(obj) ? obj.length === 0 : Object.keys(obj).length === 0;
}
```

An oft-forgotten feature of the ternary operator is that it can be used _within_ another expression. Looking at the above code we're always comparing the length of something with 0, so the ternary could focus on picking what that something is:

[View submission on LeetCode](https://leetcode.com/problems/is-object-empty/submissions/1375714948/)

```typescript []
function isEmpty(
  obj: Readonly<Record<PropertyKey, unknown>> | readonly unknown[],
): boolean {
  return (Array.isArray(obj) ? obj : Object.keys(obj)).length === 0;
}
```

But if we truly want to golf this, we can

- use [an arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- treat the numeric length as a boolean and use `!` to negate its value
- remove the return type annotation since `!` can only return a boolean
- sloppily use `Object.keys` for any input, even arrays, since it seems to work
- remove the array part of the argument's type annotation since arrays are objects
- rename the argument, since that doesn't affect how the function can be used

The result is:

[View submission on LeetCode](https://leetcode.com/problems/is-object-empty/submissions/1375736186/)

```typescript []
const isEmpty = (o: Readonly<Record<PropertyKey, unknown>>) =>
  !Object.keys(o).length;
```

We could also save some characters by using `let` instead of `const` and `any` for the type annotation but I didn't want to loosen things up _too_ much.

Note that `Object.values` or `Object.entries` could be used instead of `Object.keys` throughout the solutions above.

### Using `JSON.stringify`

An empty object gets stringified to `"{}"` so instead of checking if `Object.keys(obj).length === 0`, we can check if `JSON.stringify(obj) === "{}"`. For example, in pure JavaScript:

[View submission on LeetCode](https://leetcode.com/problems/is-object-empty/submissions/1375715874/)

```javascript []
/**
 * @param {Object|Array} obj
 * @return {boolean}
 */
function isEmpty(obj) {
  if (Array.isArray(obj)) {
    return obj.length === 0;
  } else {
    return JSON.stringify(obj) === "{}";
  }
}
```

Or in TypeScript, using a ternary:

[View submission on LeetCode](https://leetcode.com/problems/is-object-empty/submissions/1375716353/)

```typescript []
function isEmpty(
  obj: Readonly<Record<PropertyKey, unknown>> | readonly unknown[],
): boolean {
  return Array.isArray(obj) ? obj.length === 0 : JSON.stringify(obj) === "{}";
}
```

We could also check if stringifying gives us a length of 2, since if the object has any properties at all, that will push the length beyond 2:

[View submission on LeetCode](https://leetcode.com/problems/is-object-empty/submissions/1375719502/)

```typescript []
function isEmpty(
  obj: Readonly<Record<PropertyKey, unknown>> | readonly unknown[],
): boolean {
  return Array.isArray(obj)
    ? obj.length === 0
    : JSON.stringify(obj).length === 2;
}
```

Empty arrays also get stringified to a string of length 2 (specifically `"[]"`) so we can golf once again. `JSON.stringify` accepts pretty much anything as an argument, so we can golf the argument type annotation too:

[View submission on LeetCode](https://leetcode.com/problems/is-object-empty/submissions/1375719967/)

```typescript []
const isEmpty = (o: unknown) => JSON.stringify(o).length < 3;
```

This would break in the case of something like `isEmpty(12)` but LeetCode promised us that the input will be an array or an object, so we don't have to worry about it.

We should, however, feel a little bad that we're traversing entire data structures. Let's atone by writing a more efficient solution.

### Using `for...in`

The most careful solutions will distinguish between arrays and non-array objects, as well as check property ownership. In pure JavaScript:

[View submission on LeetCode](https://leetcode.com/problems/is-object-empty/submissions/1375720258/)

```javascript []
/**
 * @param {Object|Array} obj
 * @return {boolean}
 */
function isEmpty(obj) {
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }

  for (const property in obj) {
    if (Object.hasOwn(obj, property)) {
      return false;
    }
  }

  return true;
}
```

If you like ternaries as much as I do, you may put the loop in a helper function. Note that we will need a TypeScript cast using the `as` keyword for TypeScript to approve of the second branch. I'll have to discuss casts in more detail another time.

[View submission on LeetCode](https://leetcode.com/problems/is-object-empty/submissions/1375728095/)

```typescript []
function isEmptyObject(obj: Readonly<Record<string, unknown>>): boolean {
  for (const property in obj) {
    if (Object.hasOwn(obj, property)) {
      return false;
    }
  }

  return true;
}

function isEmpty(
  obj: Readonly<Record<PropertyKey, unknown>> | readonly unknown[],
): boolean {
  return Array.isArray(obj)
    ? obj.length === 0
    : isEmptyObject(obj as Readonly<Record<PropertyKey, unknown>>);
}
```

If we don't care to be careful, we can skip the array-ness and ownership checks. LeetCode accepts this:

[View submission on LeetCode](https://leetcode.com/problems/is-object-empty/submissions/1375734860/)

```typescript []
function isEmpty(
  obj: Readonly<Record<PropertyKey, unknown>> | readonly unknown[],
): boolean {
  for (const _property in obj) {
    return false;
  }

  return true;
}
```

> [!TIP]  
> A big takeaway of this problem is that plain JavaScript objects are rather annoying when we care about the size. Although empty-ness can still be checked somewhat efficiently if we use the `for...in` implementation, there's no good way to avoid linear time complexity if we need the number of entries. We'd have to maintain our own variable for the size and keep it in sync with the object. Thankfully, if we want a map data structure, modern JavaScript gives us another option in [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

## Answers to Bonus Questions

1. **What's the difference between `obj instanceof Array` and `Array.isArray(obj)`?**

   [The `Array.isArray` documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#instanceof_vs._array.isarray) mentions why `obj instanceof Array` may not always work, and the reason is fascinating! The `Array` class is not shared across different JavaScript "realms". For example if we embed a web page within another web page using an [`iframe`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe), the inner web page will get its own JavaScript execution context, with its own `Array` class, which won't be referentially the same as the parent web page's `Array` class. Checking objects from the inner realm against the outer realm's `Array` class using `instanceof` would return false!

2. **What happens if `Object.keys` or its friends is invoked with an array argument?**

   `Object.keys` works fine, and returns the "keys" of the array, i.e. the indexes. However, it not only creates a new array, it also stringifies the keys. You'd be better off using [`Array.prototype.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys) which doesn't stringify and returns an iterator instead of creating a full array.

   ```javascript []
   const arr = [3, 1, 4];
   console.log(Object.keys(arr)); // prints [ "0", "1", "2" ]
   ```

   `Object.values` is an odd way of copying the array and would probably surprise people reading your code, since `Object.values` is usually used with non-array objects. Prefer [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_array_literals) to copy an array.

   ```javascript []
   const arr = [3, 1, 4];
   console.log(Object.values(arr)); // prints [ 3, 1, 4 ]
   console.log(Object.values(arr) === arr); // prints false, it's a new array
   ```

   You can probably guess what `Object.entries` does.

3. **Can we use `Array.from` to turn objects into arrays?**

   Yes in the sense that `Array.from` won't crash if we give it an arbitrary object, but the result probably isn't what we want:

   ```javascript []
   const obj = { foo: "bar" };
   console.log(Array.from(obj)); // prints []
   ```

   That's because `Array.from` looks for a `length` property to decide the size of the array, and then it tries to index from 0 inclusive to the length, exclusive. Properties not named `length` and properties outside the range are ignored:

   ```javascript []
   const obj = {
     foo: "this is ignored",
     length: 3,
     5: "this is also ignored",
     1: "used",
   };
   console.log(Array.from(obj)); // prints [ undefined, "used", undefined ]
   ```

   For objects that implement [the iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol), `Array.from` does what you'd expect:

   ```javascript []
   console.log(Array.from("hello")); // prints [ "h", "e", "l", "l", "o" ]
   ```

4. **What happens if we use `for...in` on an array?**

   It iterates over the _indexes_ not the values, and just like `Object.keys`, they are stringified. I was once asked in an interview to debug some JavaScript code, the problem was that it used `for...in` to iterate over an array. Remember that `in` is for keys and `of` is for values.

   ```javascript []
   for (const property in [3, 1, 4]) {
     console.log(property); // prints "0", then "1", then "2"
   }

   for (const element of [3, 1, 4]) {
     console.log(element); // prints 3, then 1, then 4
   }
   ```

   You might be wondering why using `in` on an array doesn't print `"length"`. Isn't `length` one of the array's properties? It's because [the array `length` property is not enumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length#value), and `for...in` only iterates over enumerable properties.

5. **What happens if we use `Record<unknown, unknown>` in TypeScript?**

   We'll get a typecheck error:

   > Type 'unknown' does not satisfy the constraint 'string | number | symbol'.

   In effect this reveals the definition of `PropertyKey`. It's likely defined somewhere as:

   ```typescript []
   type PropertyKey = string | number | symbol;
   ```

> [!TIP]  
> Thanks for reading! If you enjoyed this write-up, feel free to [up-vote it on LeetCode](https://leetcode.com/problems/is-object-empty/solutions/5722608/content/)! 🙏
