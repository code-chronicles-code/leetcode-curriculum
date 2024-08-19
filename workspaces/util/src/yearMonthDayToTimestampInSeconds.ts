import { MS_IN_SEC } from "@code-chronicles/util/timeConstants";

export function yearMonthDayToTimestampInSeconds(yearMonthDay: string): number {
  const match = yearMonthDay.match(
    /^[^0-9]*([0-9]{4})[^0-9]*([0-9]{2})[^0-9]*([0-9]{2})[^0-9]*$/,
  );
  if (match == null) {
    throw new Error(
      `Couldn't figure out which part of ${yearMonthDay} was the year, month, or day.`,
    );
  }

  const [, year, month, day] = match;

  const date = new Date(0);
  date.setUTCFullYear(
    Number(year),
    // Humans label January as 1, but JavaScript labels it as 0, so we have to
    // subtract. See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCFullYear#parameters
    Number(month) - 1,
    Number(day),
  );
  return date.getTime() / MS_IN_SEC;
}
