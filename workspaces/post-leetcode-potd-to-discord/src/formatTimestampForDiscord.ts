type DateType = "t" | "T" | "d" | "D" | "f" | "F" | "R";

export function formatTimestampForDiscord(
  timestamp: number,
  type?: DateType,
): string {
  return `<t:${timestamp}${type != null ? ":" + type : ""}>`;
}
