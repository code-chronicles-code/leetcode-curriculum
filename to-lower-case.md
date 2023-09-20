# Thread Template

Hi friends! The REPLACE WITH DAY OF WEEK problem is [709. To Lower Case](https://leetcode.com/problems/to-lower-case/). We have live discussions at **8-8:15am**, **7-7:15pm**, and **9:30-9:45pm** (all times California time) for anyone who wants to discuss or see the problem solved live.

* **Baseline goal**: get accepted in any way at all!
* **Stretch goal**: write two solutions, one using your language's built-in function and one not using it; try not to hard-code numbers from the ASCII table, instead programmatically compute any magic numbers you're tempted to use by having your code operate on the strings "A" and "a"
* **Stretch stretch goal**: pretend that ASCII codes or character data types don't exist at all! It's totally ok if your solution is verbose or less efficient

I look forward to seeing your solutions!

Some reference solutions for inspiration:
* using built-in in ([TypeScript/JavaScript](https://leetcode.com/problems/to-lower-case/submissions/1042110308/), [Ruby](https://leetcode.com/problems/to-lower-case/submissions/1042110690/), [Python](https://leetcode.com/problems/to-lower-case/submissions/1042111423/), [Java](https://leetcode.com/problems/to-lower-case/submissions/1042109983/))
* not using built-in ([Java](https://leetcode.com/problems/to-lower-case/submissions/957446695/), [TypeScript/JavaScript](https://leetcode.com/problems/to-lower-case/submissions/1021136148/))
* independent of ASCII codes, but O(length of string × length of alphabet) ([TypeScript/JavaScript](https://leetcode.com/problems/to-lower-case/submissions/1021132714/))
* independent of ASCII codes, building the mapping once ([TypeScript/JavaScript](https://leetcode.com/problems/to-lower-case/submissions/1021133763/))

# Notes for Facilitators

This is a quick problem, appropriate for helping new learners experience the joy of getting their solution accepted by LeetCode. The baseline goal should be achievable with a built-in function in pretty much any language. However there are also a couple of key lessons we can learn from this problem, namely:
1. Avoid hard-coding magic numbers! It's not necessary to memorize or look up ASCII codes to solve this problem.
2. Be careful how you're building up strings. In some languages (for example Java) strings are immutable, so every time we add a character to the end of the string we have to create an entirely new copy of everything before.

Since the solution using a built-in function is so simple, this is also an opportunity to get a few different people to project their code and become comfortable sharing with the group live.

**People may also ask whether using built-in functions is appropriate for interviews.** Explain that if the question is literally this, then almost certainly using the built-in is not the intent -- (most) interviews are evaluating whether you understand the concept, not whether you remember the API. However, if converting to lower case is just one part of a longer problem, then using the built-ins is totally fine. Encourage people to ask their interviewer rather than assuming.

## Checklist for a good session:

* controlled the clock
  * started on time
  * ended on time
* fostered a positive learning environment
  * led the discussion with enthusiasm
  * involved the audience
  * confirmed that people understand the code being shown
* covered the solution using built-in functions
  * got at least 2 different people to share their code using a built-in function
  * made it clear that using a built-in during interviews is ok, if it doesn't defeat the purpose of the interview question (so it wouldn't be ok for this problem, but it would be ok in many other cases)
* covered the solution using ASCII codes
  * emphasized that we should not hard-code magic numbers like 32, 65, 97, etc. and showed how to compute the numbers we need instead
  * mentioned that some languages have functions for converting between characters and their ASCII code equivalents (for example `chr` and `ord` in Python, or `codePointAt` and `fromCodePoint` in JavaScript) and encouraged people to look up what those are in their preferred language

## Bonus points:

* covered the solution using ASCII codes in 2 or more programming languages
* covered the topic of immutable strings
  * explained that we need to be careful when we append characters to a string, as it may require copying the entire string
  * gave a specific example, such as String vs. StringBuilder in Java
  * encouraged everyone to look up what is the most efficient way of appending to a string in their language and share it in the problem thread
* showed a solution that's independent of ASCII codes, for example [this one](https://leetcode.com/problems/to-lower-case/submissions/1021132714/) (most likely the facilitator will need to either project or code this up)

## Code Review:

* Variables / Operations
  * Clear and concise variable names
  * Using let instead of const when variable isn't reassigned
  * Extra variables that could be inlined (variables only used once)
  * Using strict equality (For JS and TS)
* Other
  * See if other languages allow [foreach](https://en.wikipedia.org/wiki/Foreach_loop) to iterate through the input
  * Avoid the need to remember ASCII codes
