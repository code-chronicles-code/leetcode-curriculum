export function centerTextInComment({
  commentType,
  preferredLineWidth = 80,
  text,
}: {
  commentType: "#" | "//";
  preferredLineWidth?: number;
  text: string;
}): string {
  const prefix = " ";
  const suffix = " ";

  const left =
    commentType +
    commentType[0].repeat(
      Math.max(
        0,
        Math.floor(
          (preferredLineWidth - text.length - prefix.length - suffix.length) /
            2,
        ) - commentType.length,
      ),
    );

  const right = commentType[0].repeat(
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
