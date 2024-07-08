import { describe, expect, it } from "@jest/globals";

import { LANGUAGE_NAMES } from "../constants";
import type { Language } from "../Language";
import { mergeCode } from "../mergeCode";
import { readAllGoodies } from "../../scripts/package-goodies/readAllGoodies";

function setUnsafe(
  obj: unknown,
  properties: readonly [string, ...string[]],
  value: unknown,
): void {
  let map = obj;
  for (let i = 0; i < properties.length - 1; ++i) {
    map = (map as Record<string, unknown>)[properties[i]] ??= {};
  }
  (map as Record<string, unknown>)[properties.at(-1)!] = value;
}

setUnsafe(globalThis, ["requestIdleCallback"], <T>(fn: () => T): T => fn());
setUnsafe(globalThis, ["window", "location", "href"], "https://example.com/");

describe("App", () => {
  it("can equip single goody", async () => {
    const goodiesByLanguage = await readAllGoodies();

    for (const language of Object.keys(goodiesByLanguage) as Language[]) {
      const goodies = goodiesByLanguage[language];
      for (const goodyName of Object.keys(goodies)) {
        // eslint-disable-next-line no-await-in-loop
        const mergedCode = await mergeCode({
          commitHash: "fake-commit-hash",
          goodies,
          language,
          equippedGoodies: new Set([goodyName]),
        });

        expect(mergedCode).toMatchSnapshot(
          `${LANGUAGE_NAMES[language]} ${goodyName}`,
        );
      }
    }
  });
});
