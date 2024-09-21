import type { WritableDeep } from "type-fest";

import type { JavaGoody } from "../../../app/zod-types/javaGoodyZodType.ts";
import { extractJavaesqueImports } from "../extractJavaesqueImports.ts";
import { readCode } from "./readCode.ts";
import { readMetadata } from "./readMetadata.ts";
import { splitCodeIntoClasses } from "./splitCodeIntoClasses.ts";

export type JavaGoodyBase = Omit<WritableDeep<JavaGoody>, "importedBy">;

export async function readBaseGoody(
  packageName: string,
): Promise<JavaGoodyBase> {
  const [codeWithImports, { name }] = await Promise.all([
    readCode(packageName),
    readMetadata(packageName),
  ]);

  const { codeWithoutImports, coreImports, imports, importsCode } =
    extractJavaesqueImports(codeWithImports);

  const codeByClass = splitCodeIntoClasses(codeWithoutImports);

  return {
    codeByClass,
    coreImports,
    imports: Array.from(imports),
    importsCode,
    language: "java",
    name,
    packageName,
  };
}
