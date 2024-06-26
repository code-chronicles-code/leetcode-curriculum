export function centerTextInComment(
  text: string,
  preferredLineWidth: number = 80,
): string {
  const prefix = " ";
  const suffix = " ";
  const left = "/".repeat(
    Math.max(
      2,
      Math.floor(
        (preferredLineWidth - text.length - prefix.length - suffix.length) / 2,
      ),
    ),
  );
  const right = "/".repeat(
    Math.max(
      0,
      preferredLineWidth -
        text.length -
        prefix.length -
        suffix.length -
        left.length,
    ),
  );
  return [left, prefix, text, suffix, right].join("").trim();
}
