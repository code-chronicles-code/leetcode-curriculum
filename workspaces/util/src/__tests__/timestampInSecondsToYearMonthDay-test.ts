import { describe, expect, it } from "@jest/globals";

import { timestampInSecondsToYearMonthDay } from "../timestampInSecondsToYearMonthDay.ts";

describe("timestampInSecondsToYearMonthDay", () => {
  it.each([
    [1721211, "1970-01-20"],
    [-1721211, "1969-12-12"],
    [143212421, "1974-07-16"],
    [1672531199, "2022-12-31"],
    [1723621211, "2024-08-14"],
    [3232131232, "2072-06-02"],
    [32523328890, "3000-08-16"],
    [1129 * 43322, "1971-07-21"],
    [1242312321.32323, "2009-05-14"],
    [1e10, "2286-11-20"],
    [1e12, "33658-09-27"],
    [Math.PI * 24 * 60 * 60, "1970-01-04"],
  ])(
    "formats timestamp with default separator: %p => %p",
    (timestamp, expected) => {
      expect(timestampInSecondsToYearMonthDay(timestamp)).toBe(expected);
    },
  );

  it.each([
    [1672531199, "", "20221231"],
    [1672531199, "/", "2022/12/31"],
    [1672531199, ".", "2022.12.31"],
    [1672531199, "_", "2022_12_31"],
    [1672531199, " ", "2022 12 31"],
    [1672531199, "__", "2022__12__31"],
    [1672531199, "\\", "2022\\12\\31"],
    [1672531199, "lol", "2022lol12lol31"],
  ])(
    "formats timestamp with custom separator: %p with %p => %p",
    (timestamp, separator, expected) => {
      expect(timestampInSecondsToYearMonthDay(timestamp, separator)).toBe(
        expected,
      );
    },
  );

  it("detects the year boundary", () => {
    expect(timestampInSecondsToYearMonthDay(1640995199)).toBe("2021-12-31");
    expect(timestampInSecondsToYearMonthDay(1640995200)).toBe("2022-01-01");

    expect(timestampInSecondsToYearMonthDay(0)).toBe("1970-01-01");
    expect(timestampInSecondsToYearMonthDay(-1)).toBe("1969-12-31");
  });

  it.each([9999999999999, NaN, Infinity, -Infinity, 1e100])(
    "throws when an invalid timestamp has been passed: %p",
    (timestamp) => {
      expect(() => timestampInSecondsToYearMonthDay(timestamp)).toThrow(
        RangeError,
      );
    },
  );
});
