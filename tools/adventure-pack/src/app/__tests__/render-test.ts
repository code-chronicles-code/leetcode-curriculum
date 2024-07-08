import { describe, expect, it } from "@jest/globals";

import { LANGUAGE_NAMES } from "../constants";
import type { Language } from "../Language";
import { readAllGoodies } from "../../scripts/package-goodies/readAllGoodies";
import { goodyToText } from "../goodyToText";

describe("App", () => {
  it("can render goody", async () => {
    const goodiesByLanguage = await readAllGoodies();

    for (const language of Object.keys(goodiesByLanguage) as Language[]) {
      const goodies = goodiesByLanguage[language];
      for (const goody of Object.values(goodies)) {
        const code = goodyToText(goody);

        expect(code).toMatchSnapshot(
          `${LANGUAGE_NAMES[language]} ${goody.name}`,
        );
      }
    }
  });
});
