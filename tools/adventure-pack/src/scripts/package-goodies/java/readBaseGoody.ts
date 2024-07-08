import { WritableDeep } from "type-fest";

import type { JavaGoody } from "../../../app/parsers/javaGoodyParser";
import { extractJavaesqueImports } from "../extractJavaesqueImports";
import { readCode } from "./readCode";
import { readMetadata } from "./readMetadata";
import { splitCodeIntoClasses } from "./splitCodeIntoClasses";

export type JavaGoodyBase = Omit<WritableDeep<JavaGoody>, "importedBy">;

export async function readBaseGoody(
  packageName: string,
): Promise<JavaGoodyBase> {
  const [codeWithImports, { name }] = await Promise.all([
    readCode(packageName),
    readMetadata(packageName),
  ]);

  const { codeWithoutImports, imports, importsCode } =
    extractJavaesqueImports(codeWithImports);

  const codeByClass = splitCodeIntoClasses(codeWithoutImports);

  return {
    codeByClass,
    imports: Array.from(imports),
    importsCode,
    name,
    language: "java",
    packageName,
  };
}
