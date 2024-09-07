# 2724. Sort By

[View Problem on LeetCode](https://leetcode.com/problems/sort-by/)

This problem is testing if we know how to sort using a custom "sort key". Note that the problem statement didn't say anything about not using built-in functions such as [`Array.prototype.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort). On the contrary, I believe the problem _wants_ us to use the built-ins, and the intent is to have us practice specifying a custom comparison function.

The part of the problem statement stating "You may assume that `fn` will never duplicate numbers for a given array" ensures that we don't have to worry about our sorting algorithm's [stability](https://en.wikipedia.org/wiki/Sorting_algorithm#Stability), although if we use a built-in sort, the specification states that it will be stable.

For an added challenge, consider the case in which `fn` might be very expensive, and try to minimize how many times we invoke it.

Once you've worked on the problem, check out [the full write-up and solution](solution.md)!
