export function toTitleCase(s: string): string {
  return s.replaceAll(
    /\S+/g,
    (word) => word[0].toUpperCase() + word.slice(1).toLowerCase(),
  );
}
