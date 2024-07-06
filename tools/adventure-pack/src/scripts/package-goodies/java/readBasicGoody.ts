import fsPromises from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

import { only } from "@code-chronicles/util";

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

export async function readBasicGoody(packageName: string): Promise<JavaGoody> {
  const [code, { name }] = await Promise.all([
    readCode(packageName),
    readMetadata(packageName),
  ]);

  return {
    code,
    globalModuleDeclarations: [],
    importedBy: [],
    imports: [],
    name,
    language: "java",
  };
}
