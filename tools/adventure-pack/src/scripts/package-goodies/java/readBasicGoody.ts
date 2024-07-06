import fsPromises from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

import {
  getLines,
  isStringEmptyOrWhitespaceOnly,
  only,
} from "@code-chronicles/util";

import type { JavaGoody } from "../../../app/parsers/javaGoodyParser";

export const GOODIES_DIRECTORY = path.join("goodies", "java", "src");

async function readCode(packageName: string): Promise<string> {
  const fileEntries = await fsPromises.readdir(
    path.join(GOODIES_DIRECTORY, packageName),
    { withFileTypes: true },
  );

  const mainFileName = only(
    fileEntries.filter(
      (entry) =>
        entry.isFile() &&
        entry.name.endsWith(".java") &&
        entry.name !== "Test.java",
    ),
  ).name;

  return await fsPromises.readFile(
    path.join(GOODIES_DIRECTORY, packageName, mainFileName),
    "utf8",
  );
}

const metadataParser = z
  .object({
    name: z.string().regex(/^\S/).regex(/\S$/),
  })
  .strict();

type Metadata = z.infer<typeof metadataParser>;

async function readMetadata(packageName: string): Promise<Metadata> {
  const text = await fsPromises.readFile(
    path.join(GOODIES_DIRECTORY, packageName, "goody.json"),
    "utf8",
  );

  return metadataParser.parse(JSON.parse(text));
}

function extractImports(code: string): {
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

export async function readBasicGoody(packageName: string): Promise<JavaGoody> {
  const [codeWithImports, { name }] = await Promise.all([
    readCode(packageName),
    readMetadata(packageName),
  ]);

  const { codeWithoutImports, imports, importsCode } =
    extractImports(codeWithImports);

  return {
    code: codeWithoutImports,
    importedBy: [],
    imports: Array.from(imports),
    importsCode,
    name,
    language: "java",
    packageName,
  };
}
