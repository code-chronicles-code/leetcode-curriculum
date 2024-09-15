import process from "node:process";

import { fetchActiveDailyCodingChallengeQuestionWithDateValidation as fetchPotd } from "@code-chronicles/leetcode-api";
import { promiseAllObject } from "@code-chronicles/util/promiseAllObject";
import { sleep } from "@code-chronicles/util/sleep";
import {
  MS_IN_SEC,
  SEC_IN_DAY,
  SEC_IN_MIN,
} from "@code-chronicles/util/timeConstants";
import { whileReturnsTrueAsync } from "@code-chronicles/util/whileReturnsTrueAsync";
import { yearMonthDayToTimestampInSeconds } from "@code-chronicles/util/yearMonthDayToTimestampInSeconds";

import { getPotdMessage } from "./getPotdMessage.js";
import { readScriptData } from "./readScriptData.js";
import { readSecrets } from "./readSecrets.js";
import { sendDiscordMessage } from "./sendDiscordMessage.js";
import { writeScriptData } from "./writeScriptData.js";

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
      const nextDayInSeconds =
        yearMonthDayToTimestampInSeconds(date) + SEC_IN_DAY;
      const secondsToSleep = Math.max(
        SEC_IN_MIN,
        Math.floor(nextDayInSeconds - Date.now() / MS_IN_SEC),
      );
      console.error(
        `Already posted the problem for ${date}, will sleep ${secondsToSleep} seconds until the next UTC day.`,
      );

      await sleep(secondsToSleep * MS_IN_SEC);
      return true;
    }

    const message = getPotdMessage({ date, question: potd });
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
