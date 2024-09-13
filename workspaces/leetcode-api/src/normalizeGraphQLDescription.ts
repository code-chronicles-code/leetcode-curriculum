import { compareStringsCaseInsensitive } from "@code-chronicles/util/compareStringsCaseInsensitive";

export function normalizeGraphQLDescription(desc: string): string {
  return desc.replaceAll(/<ul>((?:<li>[^<]*<\/li>)*)<\/ul>/g, (_, lisMatch) => {
    const items = Array.from(
      lisMatch.matchAll(/<li>([^<]*)<\/li>/g),
      ([, liMatch]) => liMatch,
    )
      .sort(compareStringsCaseInsensitive)
      .map((item) => `<li>${item}</li>`);

    return `<ul>${items.join("")}</ul>`;
  });
}
