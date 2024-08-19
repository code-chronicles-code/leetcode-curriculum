import nullthrows from "nullthrows";

import { MS_IN_SEC } from "@code-chronicles/util/timeConstants";

export function timestampInSecondsToYearMonthDay(
  timestampInSeconds: number,
  separator: string = "-",
): string {
  const parts = new Intl.DateTimeFormat(undefined, {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(timestampInSeconds * MS_IN_SEC));

  return ["year", "month", "day"]
    .map((partType) => nullthrows(parts.find((p) => p.type === partType)).value)
    .join(separator);
}
