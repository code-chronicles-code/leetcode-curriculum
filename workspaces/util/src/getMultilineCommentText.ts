import { getLines } from "@code-chronicles/util/getLines";

export function getMultilineCommentText(text: string): string {
  const lines = Array.from(getLines(text.trim()));

  lines[0] = lines[0].replace(/^\s*\/\*\*\s*/, "");
  lines[lines.length - 1] = lines[lines.length - 1].replace(/\s*\*\/$/, "");
  for (let i = 1; i < lines.length; ++i) {
    lines[i] = lines[i].replace(/^\s*\*\s*/, "");
  }

  return lines.join("").trim();
}
