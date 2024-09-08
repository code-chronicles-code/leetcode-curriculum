# 2626. Array Reduce Transformation

[View Problem on LeetCode](https://leetcode.com/problems/array-reduce-transformation/)

This is yet another problem asking us to re-implement some built-in JavaScript function. Here, it's actually slightly simpler than the built-in -- whereas [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) also passes an index to the reducing function, in this problem we don't care about the index, only the value.

We can get a quick accept if we ignore the problem statement's request and use the built-in`.reduce`.

For a more serious solution, we can go with any kind of loop over the array values, updating a result during the loop.

Once you've worked on the problem, check out [the full write-up and solution](solution.md)!
