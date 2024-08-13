import process from "node:process";

import { fetchActiveDailyCodingChallengeQuestionWithDateValidation as fetchPotd } from "@code-chronicles/leetcode-api";
import { promiseAllObject } from "@code-chronicles/util/promiseAllObject";
import { sleep } from "@code-chronicles/util/sleep";

import { getPotdMessage } from "./getPotdMessage";
import { readScriptData } from "./readScriptData";
import { readSecrets } from "./readSecrets";
import { sendDiscordMessage } from "./sendDiscordMessage";
import { writeScriptData } from "./writeScriptData";

async function main(): Promise<void> {
  // TODO: maybe create the file from a template if it doesn't exist
  const secrets = await readSecrets();

  while (true) {
    const {
      scriptData,
      potd: { date, question: potd },
    } =
      // eslint-disable-next-line no-await-in-loop
      await promiseAllObject({
        potd: fetchPotd(),
        scriptData: readScriptData(),
      });

    console.error({ scriptData });

    if (
      scriptData.lastPostedDate != null &&
      date === scriptData.lastPostedDate
    ) {
      // TODO: utility
      const nextDayInSeconds = (() => {
        const d = new Date(0);
        const [year, month, day] = date.split("-").map(Number);
        d.setUTCFullYear(year, month - 1, day);
        return d.getTime() / 1000 + 24 * 60 * 60;
      })();

      const secondsToSleep = Math.max(
        60,
        Math.floor(nextDayInSeconds - Date.now() / 1000),
      );
      console.error(
        `Already posted the problem for ${date}, will sleep ${secondsToSleep} seconds until the next UTC day.`,
      );
      // eslint-disable-next-line no-await-in-loop
      await sleep(secondsToSleep * 1000);
      continue;
    }

    const message = getPotdMessage(potd);
    // eslint-disable-next-line no-await-in-loop
    await sendDiscordMessage(secrets, message);
    // eslint-disable-next-line no-await-in-loop
    await writeScriptData({ ...scriptData, lastPostedDate: date });
    console.error(message);
    break;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
