import { compareStringsCaseInsensitive } from "@code-chronicles/util/compareStringsCaseInsensitive";

export function sortByName<T extends { name: string }>(arr: readonly T[]): T[] {
  // TODO: migrate to .toSorted
  return [...arr].sort((a, b) => compareStringsCaseInsensitive(a.name, b.name));
}
