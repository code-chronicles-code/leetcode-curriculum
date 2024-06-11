import process from "process";

import {
  getQuestionList,
  type QuestionListQuestion,
} from "@code-chronicles/leetcode-api";

// TODO: make into a shared utility?
import { sleep } from "@code-chronicles/leetcode-api/src/sleep";

async function main(): Promise<void> {
  let totalCount: number | null = null;
  const problemsMap = new Map<number, QuestionListQuestion>();
  let skip = 0;

  while (problemsMap.size !== totalCount) {
    if (totalCount != null) {
      console.error("Sleeping...");
      await sleep(5000);
    }

    console.error("Fetching...");
    const data = await getQuestionList({
      categorySlug: "algorithms",
      skip,
      limit: 500,
      filters: { difficulty: "EASY" },
    });
    totalCount = data.totalNum;

    for (const question of data.questions) {
      problemsMap.set(question.problemNumber, question);
    }

    if (data.questions.length === 0) {
      console.error("Experienced a pagination error, resetting offset.");
      skip = 0;
    } else {
      skip += data.questions.length;
    }

    console.error(
      `Fetched data on ${[problemsMap.size]} / ${totalCount} problems so far.`,
    );
  }

  const problems = [...problemsMap.values()].sort(
    (a, b) => a.problemNumber - b.problemNumber,
  );
  console.log(JSON.stringify(problems, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
