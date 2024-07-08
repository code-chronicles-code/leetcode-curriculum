import invariant from "invariant";
import {
  createScanner,
  transpile as originalTranspile,
  LanguageVariant,
  SyntaxKind,
  ScriptTarget,
} from "typescript";

import { getRandomBytes } from "@code-chronicles/util";

import { formatCode } from "./formatCode";
import { removeUninitializedPropertyDeclarations } from "./removeUninitializedPropertyDeclarations";

export async function transpile(code: string): Promise<string> {
  // There is some dark magic here to work around the fact that TypeScript
  // doesn't preserve newlines when transpiling! So we add a special comment
  // to track newlines in the original code, and then we restore them later.

  const sig = await (async () => {
    for (let len = 16; ; ++len) {
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
      codeWithMarkedNewlines.push(`\n/*${sig}:${text.length}*/\n`);
    } else {
      codeWithMarkedNewlines.push(text);
    }
  }

  const transpiledCode = originalTranspile(codeWithMarkedNewlines.join(""), {
    target: ScriptTarget.Latest,
  }).replaceAll(
    new RegExp("\\s*\\/\\*" + sig + ":(\\d+)\\*\\/\\s*", "g"),
    (_match, len) => "\n".repeat(Number(len)),
  );

  return await formatCode(
    removeUninitializedPropertyDeclarations(transpiledCode),
  );
}
