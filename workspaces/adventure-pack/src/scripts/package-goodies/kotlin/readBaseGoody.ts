import type { WritableDeep } from "type-fest";

import type { KotlinGoody } from "../../../app/parsers/kotlinGoodyParser";
import { extractJavaesqueImports } from "../extractJavaesqueImports";
import { readCode } from "./readCode";
import { readMetadata } from "./readMetadata";

export type KotlinGoodyBase = Omit<WritableDeep<KotlinGoody>, "importedBy">;

export async function readBaseGoody(
  packageName: string,
): Promise<KotlinGoodyBase> {
  const [codeWithImports, { name }] = await Promise.all([
    readCode(packageName),
    readMetadata(packageName),
  ]);

  const { codeWithoutImports, imports, importsCode } =
    extractJavaesqueImports(codeWithImports);

  return {
    code: codeWithoutImports,
    imports: Array.from(imports),
    importsCode,
    language: "kotlin",
    name,
    packageName,
  };
}
