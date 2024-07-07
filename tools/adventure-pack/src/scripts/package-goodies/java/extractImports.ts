import { getLines, isStringEmptyOrWhitespaceOnly } from "@code-chronicles/util";

export function extractImports(code: string): {
  codeWithoutImports: string;
  imports: Set<string>;
  importsCode: string;
} {
  const lines = Array.from(getLines(code));
  const imports = new Set<string>();
  const importsCode: string[] = [];

  while (lines.length > 0) {
    if (isStringEmptyOrWhitespaceOnly(lines[0])) {
      importsCode.push(lines.shift()!);
      continue;
    }

    const packageNameMatch = lines[0].match(/^package\s+[^;]+;\n?$/);
    if (packageNameMatch != null) {
      // TODO: verify that the package name matches what's expected
      lines.shift();
      continue;
    }

    const importMatch = lines[0].match(/^import\s+(?:static\s+)?([^\.]+)\./);
    if (importMatch != null) {
      importsCode.push(lines.shift()!);
      imports.add(importMatch[1]);
      continue;
    }

    break;
  }

  while (
    importsCode.length > 0 &&
    isStringEmptyOrWhitespaceOnly(importsCode[0])
  ) {
    importsCode.shift();
  }

  return {
    codeWithoutImports: lines.join(""),
    imports,
    importsCode: importsCode.join(""),
  };
}
