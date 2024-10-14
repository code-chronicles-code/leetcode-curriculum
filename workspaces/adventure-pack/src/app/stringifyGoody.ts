import type { Goody } from "./Goody.ts";
import { mergeJavaCode } from "./mergeJavaCode.ts";
import { stringifyTypeScriptModuleDeclarations } from "./stringifyTypeScriptModuleDeclarations.ts";

export function stringifyGoody(goody: Goody): string {
  switch (goody.language) {
    case "java": {
      return (
        `package ${goody.packageName};\n\n` +
        goody.importsCode +
        mergeJavaCode([goody])
      ).trim();
    }
    case "javascript": {
      return (
        goody.imports.map((im) => `import ${JSON.stringify(im)};\n`).join("") +
        "\n" +
        goody.code
      ).trim();
    }
    case "kotlin": {
      return (
        `package ${goody.packageName}\n\n` +
        goody.importsCode +
        goody.code
      ).trim();
    }
    case "python3": {
      return goody.code.trim();
    }
    case "typescript": {
      const moduleDeclarations = stringifyTypeScriptModuleDeclarations(
        goody.moduleDeclarations,
      );

      return (
        goody.imports.map((im) => `import ${JSON.stringify(im)};\n`).join("") +
        "\n" +
        (moduleDeclarations.length > 0 ? moduleDeclarations + "\n\n" : "") +
        goody.code
      ).trim();
    }
  }

  // @ts-expect-error Unreachable code, switch should be exhaustive.
  console.error("Unsupported goody language:", goody);
  // @ts-expect-error Unreachable code, switch should be exhaustive.
  return goody.code;
}
