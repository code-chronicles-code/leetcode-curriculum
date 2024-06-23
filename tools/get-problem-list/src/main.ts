import process from "process";

import {
  getQuestionList,
  type QuestionListQuestion,
} from "@code-chronicles/leetcode-api";
import { sleep, writeToTemporaryFile } from "@code-chronicles/util";

async function main(): Promise<void> {
  let totalCount: number | null = null;
  const problemsMap = new Map<number, QuestionListQuestion>();
  let skip = 0;

  while (problemsMap.size !== totalCount) {
    if (totalCount != null) {
      console.error("Sleeping...");
      // eslint-disable-next-line no-await-in-loop
      await sleep(5000);
    }

    console.error("Fetching...");
    // eslint-disable-next-line no-await-in-loop
    const data = await getQuestionList({
      skip,
      limit: 500,
    });
    totalCount = data.totalNum;

    for (const question of data.questions) {
      problemsMap.set(question.questionFrontendId, question);
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
    (a, b) => a.questionFrontendId - b.questionFrontendId,
  );

  const filename = await writeToTemporaryFile(
    problems.map((p) => JSON.stringify(p) + "\n"),
    { prefix: "problems-", suffix: ".jsonl" },
  );
  console.log(`Wrote data to: ${filename}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
