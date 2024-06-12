import fsPromises, { type FileHandle } from "node:fs/promises";
import { constants } from "fs";
import crypto from "crypto";
import process from "process";

import {
  getQuestionList,
  type QuestionListQuestion,
} from "@code-chronicles/leetcode-api";

// TODO: make into a shared utility?
import { sleep } from "@code-chronicles/leetcode-api/src/sleep";

export function getRandomString(): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString("hex"));
      }
    });
  });
}

async function createTemporaryFile(
  prefix: string = "",
  suffix: string = "",
): Promise<[string, FileHandle]> {
  while (true) {
    try {
      const filename = [prefix, await getRandomString(), suffix].join("");
      return [
        filename,
        await fsPromises.open(
          filename,
          constants.O_CREAT | constants.O_RDWR | constants.O_EXCL,
        ),
      ];
    } catch (e) {
      try {
        // We won the lottery and came up with a temporary file name that
        // already exists. Try again?
        if ((e as { code: string }).code === "EEXIST") {
          continue;
        }
      } catch {}

      throw e;
    }
  }
}

async function writeToTemporaryFile(
  data: Parameters<typeof fsPromises.writeFile>[1],
  { prefix = "", suffix = "" }: { prefix?: string; suffix?: string } = {},
): Promise<string> {
  let fh, filename;
  try {
    [filename, fh] = await createTemporaryFile(prefix, suffix);
    await fsPromises.writeFile(fh, data);
    return filename;
  } finally {
    fh && (await fh.close());
  }
}

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
