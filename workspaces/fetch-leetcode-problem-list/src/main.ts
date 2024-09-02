import { constants } from "node:fs";
import { writeFile } from "node:fs/promises";
import process from "node:process";

import {
  fetchQuestionList,
  type QuestionListQuestion,
} from "@code-chronicles/leetcode-api";
import { sleep } from "@code-chronicles/util/sleep";
import { whileReturnsTrueAsync } from "@code-chronicles/util/whileReturnsTrueAsync";

const FILENAME = "problems.jsonl";

const LIMIT = 500;

async function main(): Promise<void> {
  // TODO: warn early if the file already exists

  let totalCount: number | null = null;
  const problemsMap = new Map<number, QuestionListQuestion>();
  let skip = 0;

  await whileReturnsTrueAsync(async () => {
    console.error("Fetching...");
    const data = await fetchQuestionList({ skip, limit: LIMIT });
    totalCount = data.totalNum;

    for (const question of data.questions) {
      problemsMap.set(question.questionFrontendId, question);
    }

    if (data.questions.length === 0) {
      console.error("Experienced a pagination error, resetting offset.");
      // eslint-disable-next-line require-atomic-updates -- Resetting to zero is a safe reaction to a surprising pagination result.
      skip = 0;
    } else {
      skip += data.questions.length;
    }

    console.error(
      `Fetched data on ${problemsMap.size} / ${totalCount} problems so far.`,
    );

    if (problemsMap.size === totalCount) {
      return false;
    }

    console.error("Sleeping...");
    // TODO: constant-ize the various hard-coded sleeps
    await sleep(5000);
    return true;
  });

  const problems = [...problemsMap.values()].sort(
    (a, b) => a.questionFrontendId - b.questionFrontendId,
  );

  await writeFile(
    FILENAME,
    problems.map((p) => JSON.stringify(p) + "\n"),
    {
      encoding: "utf8",
      flag: constants.O_CREAT | constants.O_RDWR | constants.O_EXCL,
    },
  );

  console.error(`Wrote data to: ${FILENAME}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
