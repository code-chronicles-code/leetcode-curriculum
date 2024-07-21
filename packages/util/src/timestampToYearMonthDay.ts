import nullthrows from "nullthrows";

export function timestampToYearMonthDay(
  timestampInSeconds: number,
  separator: string = "-",
): string {
  const parts = new Intl.DateTimeFormat(undefined, {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(timestampInSeconds * 1000));

  return ["year", "month", "day"]
    .map((partType) => nullthrows(parts.find((p) => p.type === partType)).value)
    .join(separator);
}
