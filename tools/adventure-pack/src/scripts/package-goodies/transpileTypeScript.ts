import invariant from "invariant";
import {
  createScanner,
  transpile,
  LanguageVariant,
  SyntaxKind,
  ScriptTarget,
} from "typescript";

import { getRandomBytes } from "@code-chronicles/util";

import { formatCode } from "./formatCode";

export async function transpileTypeScript(code: string): Promise<string> {
  // There is some dark magic here to work around the fact that TypeScript
  // doesn't preserve newlines when transpiling! So we add a special comment
  // to track newlines in the original code, and then we restore them later.

  const sig = await (async () => {
    for (let len = 16; ; ) {
      // eslint-disable-next-line no-await-in-loop
      const s = (await getRandomBytes(len)).toString("hex");
      if (!code.includes(s)) {
        return s;
      }
    }
  })();

  const scanner = createScanner(
    ScriptTarget.Latest,
    false,
    LanguageVariant.Standard,
    code,
  );

  const codeWithMarkedNewlines = [];
  while (true) {
    const token = scanner.scan();
    if (token === SyntaxKind.EndOfFileToken) {
      break;
    }

    const text = scanner.getTokenText();

    if (token === SyntaxKind.NewLineTrivia) {
      invariant(!/[^\n]/.test(text), "New lines should only be new lines!");
      codeWithMarkedNewlines.push(` /*${sig}:${text.length}*/ `);
    } else {
      codeWithMarkedNewlines.push(text);
    }
  }

  new RegExp("\\/\\*" + sig + ":(\\d+)\\*\\/", "g");
  const transpiledCode = transpile(codeWithMarkedNewlines.join(""), {
    target: ScriptTarget.Latest,
  }).replaceAll(
    new RegExp("\\/\\*" + sig + ":(\\d+)\\*\\/", "g"),
    (_match, len) => "\n".repeat(Number(len)),
  );

  return await formatCode(transpiledCode);
}
