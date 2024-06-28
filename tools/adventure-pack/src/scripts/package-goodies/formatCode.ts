import * as prettier from "prettier";

export function formatCode(code: string): Promise<string> {
  return prettier.format(code, { parser: "typescript" });
}
