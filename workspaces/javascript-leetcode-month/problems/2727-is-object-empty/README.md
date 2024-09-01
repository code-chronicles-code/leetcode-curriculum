# 2727. Is Object Empty

[View Problem on LeetCode](https://leetcode.com/problems/is-object-empty/)

Checking the length of an array is [straightforward](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length), but less so for an arbitrary object. However, perhaps there's a way to turn the object into an array of key-value pairs? Looking up how to do so will reveal one possible solution strategy.

The problem statement also mentions [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse), a function that parses a string into JSON data. What's the opposite of `JSON.parse`? If we could find a function that turns data into strings, it would probably be fairly clear from the resulting string if the original object was empty.

Both of the above strategies have one flaw, however. For a large object, turning it into an array or into a string will have linear time and space complexities. If you're an advanced JavaScript user, try to think of a solution that has constant complexities.

It will also probably be helpful to be able to check if a value is an array or an object. [The `typeof` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) seems tempting, but unfortunately it won't work, because an array is still an object, so `typeof` on an array returns `"object"`. However, there is another function that does what we need. Search for it.

Once you've worked on the problem, check out [the full write-up and solution](solution.md)!
