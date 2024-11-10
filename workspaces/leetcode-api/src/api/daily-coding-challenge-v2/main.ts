import type { Simplify } from "type-fest";

import { compareStrings } from "@code-chronicles/util/compareStrings";

import { fetchGraphQL, type QueryResult } from "./fetchGraphQL.generated.ts";

type Data = Simplify<NonNullable<QueryResult["dailyCodingChallengeV2"]>>;
type DailyChallenge = Data["challenges"][number];
type WeeklyChallenge = Data["weeklyChallenges"][number];

export type DailyCodingChallengeV2 = Simplify<{
  dailyChallenges: DailyChallenge[];
  weeklyChallenges: WeeklyChallenge[];
}>;

function sortByDate(challenges: DailyChallenge[] | WeeklyChallenge[]): void {
  challenges.sort((a, b) => compareStrings(a.date, b.date));
}

// TODO: support patching the schema to annotate the variables as well, to make them non-nullable
export async function fetchDailyCodingChallengeV2(variables: {
  month: number;
  year: number;
}): Promise<DailyCodingChallengeV2 | null> {
  const { dailyCodingChallengeV2: data } = await fetchGraphQL(variables);
  if (data == null) {
    return null;
  }

  const { challenges: dailyChallenges, weeklyChallenges } = data;
  sortByDate(dailyChallenges);
  sortByDate(weeklyChallenges);

  return { dailyChallenges, weeklyChallenges };
}
