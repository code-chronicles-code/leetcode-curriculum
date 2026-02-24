import { toTitleCase } from "@code-chronicles/util/toTitleCase";

export type Case = "lower" | "title" | "upper";

export function stringToCase(s: string, stringCase: Case): string {
  switch (stringCase) {
    case "lower": {
      return s.toLowerCase();
    }
    case "title": {
      return toTitleCase(s);
    }
    case "upper": {
      return s.toUpperCase();
    }
  }

  // @ts-expect-error Unreachable code, switch should be exhaustive.
  console.error(`Unsupported case: ${stringCase}`);
  // @ts-expect-error Unreachable code, switch should be exhaustive.
  return s;
}
