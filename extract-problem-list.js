// This snippet can be run in the JS console on a page like
// https://leetcode.com/problemset/algorithms/?difficulty=EASY&page=1
// to extract problem data from LeetCode.

Array.from(document.getElementsByTagName("a"))
  .filter(
    (a) =>
      a.getAttribute("href")?.startsWith("/problems/") &&
      /^(\d+)\. /.test(a.innerText.trim())
  )
  .map((a) => ({
    code: a
      .getAttribute("href")
      .replace(/^\/problems\//, "")
      .replace(/\/.*/, ""),
    problemNumber: parseInt(a.innerText.replace(/\..*/, ""), 10),
    name: a.innerText.replace(/^\d+\.\s*/, ""),
    difficulty: a.closest('[role="row"]').children[4].innerText,
    isPremium: a.classList.contains("opacity-60"),
  }))
  .sort((a, b) => a.problemNumber - b.problemNumber);
