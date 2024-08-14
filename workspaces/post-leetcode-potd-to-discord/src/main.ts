import process from "node:process";

import { fetchActiveDailyCodingChallengeQuestionWithDateValidation as fetchPotd } from "@code-chronicles/leetcode-api";
import { promiseAllObject } from "@code-chronicles/util/promiseAllObject";
import { sleep } from "@code-chronicles/util/sleep";
import { whileReturnsTrueAsync } from "@code-chronicles/util/whileReturnsTrueAsync";

import { getPotdMessage } from "./getPotdMessage";
import { readScriptData } from "./readScriptData";
import { readSecrets } from "./readSecrets";
import { sendDiscordMessage } from "./sendDiscordMessage";
import { writeScriptData } from "./writeScriptData";

async function main(): Promise<void> {
  // TODO: maybe create the file from a template if it doesn't exist
  const secrets = await readSecrets();

  await whileReturnsTrueAsync(async () => {
    const {
      scriptData,
      potd: { date, question: potd },
    } = await promiseAllObject({
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

      await sleep(secondsToSleep * 1000);
      return true;
    }

    const message = getPotdMessage(potd);
    await sendDiscordMessage(secrets, message);

    await writeScriptData({ ...scriptData, lastPostedDate: date });

    console.error(message);

    return false;
  });
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
