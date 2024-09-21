import { describe, expect, it } from "@jest/globals";

import { LANGUAGE_NAMES } from "../constants.ts";
import type { Language } from "../Language.ts";
import { readAllGoodies } from "../../scripts/package-goodies/readAllGoodies.ts";
import { stringifyGoody } from "../stringifyGoody.ts";

describe("App", () => {
  it("can render goody", async () => {
    const goodiesByLanguage = await readAllGoodies();

    for (const language of Object.keys(goodiesByLanguage) as Language[]) {
      const goodies = goodiesByLanguage[language];
      for (const goody of Object.values(goodies)) {
        const code = stringifyGoody(goody);

        expect(code).toMatchSnapshot(
          `${LANGUAGE_NAMES[language]} ${goody.name}`,
        );
      }
    }
  });
});
