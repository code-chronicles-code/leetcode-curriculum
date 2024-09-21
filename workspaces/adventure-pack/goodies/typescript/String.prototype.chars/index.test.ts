import { describe, expect, it } from "@jest/globals";

import "./index.ts";

describe("String.prototype.chars", () => {
  it("can iterate over a string's characters", () => {
    const iterator = "bonjour".chars();

    expect(iterator.next().value).toBe("b");
    expect(iterator.next().value).toBe("o");
    expect(iterator.next().value).toBe("n");
    expect(iterator.next().value).toBe("j");
    expect(iterator.next().value).toBe("o");
    expect(iterator.next().value).toBe("u");
    expect(iterator.next().value).toBe("r");
    expect(iterator.next().done).toBe(true);
  });
});
