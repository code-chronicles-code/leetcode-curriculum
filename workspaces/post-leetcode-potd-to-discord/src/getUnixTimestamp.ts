type DateType = "t" | "T" | "d" | "D" | "f" | "F" | "R";

export function getUnixTimestamp(timestamp: number, type?: DateType): string {
  return `<t:${timestamp}${type != null ? ":" + type : ""}>`;
}
