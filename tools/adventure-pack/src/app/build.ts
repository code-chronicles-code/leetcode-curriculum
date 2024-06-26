import invariant from "invariant";
import fsPromises from "node:fs/promises";
import path from "node:path";
import * as prettier from "prettier";
import { z } from "zod";
import {
  Node as TSNode,
  Project as TSProject,
  SourceFile as TSSourceFile,
} from "ts-morph";

import {
  getLines,
  stripPrefixOrThrow,
  stripSuffixOrThrow,
} from "@code-chronicles/util";
import nullthrows from "nullthrows";

const headerParser = z
  .object({ name: z.string().min(1).regex(/^\S/) })
  .strict();

type Header = z.infer<typeof headerParser>;

function parseMetadata(header: string): Header {
  const lines = Array.from(getLines(header.trim()));
  lines[0] = lines[0].replace(/^\s*\/\*\*\s*/, "");
  lines[lines.length - 1] = lines[lines.length - 1].replace(/\s*\*\/$/, "");
  for (let i = 1; i < lines.length; ++i) {
    lines[i] = lines[i].replace(/^\s*\*\s*/, "");
  }

  return headerParser.parse(
    JSON.parse(stripPrefixOrThrow(lines.join("").trim(), "@adventure").trim()),
  );
}

function formatCode(code: string): Promise<string> {
  return prettier.format(code, { parser: "typescript" });
}

function getCodeAt(
  sourceFile: TSSourceFile,
  range: readonly [number, number],
): string {
  return sourceFile.getFullText().slice(...range);
}

function removeNode(
  node: TSNode,
  { preserveTrivia = true }: { preserveTrivia?: boolean } = {},
): void {
  if (preserveTrivia) {
    node.replaceWithText(
      stripSuffixOrThrow(node.getText(true), node.getText(false)),
    );
  } else {
    node
      .getSourceFile()
      .replaceText([node.getPos(), node.getPos() + node.getFullWidth()], "");
  }
}

function getLeadingTriviaRange(node: TSNode): [number, number] {
  return [node.getPos(), node.getPos() + node.getLeadingTriviaWidth()];
}

function getTrailingTriviaRange(node: TSNode): [number, number] {
  return [
    node.getPos() + node.getFullWidth(),
    node.getPos() + node.getFullWidth() + node.getTrailingTriviaWidth(),
  ];
}

function getTrivia(sourceFile: TSSourceFile): [number, number][] {
  const set = new Set<string>();

  sourceFile.forEachDescendant((node) => {
    for (const range of [
      getLeadingTriviaRange(node),
      getTrailingTriviaRange(node),
    ]) {
      const key = range.join(" ");
      if (set.has(key)) {
        continue;
      }

      const text = getCodeAt(sourceFile, range).trim();
      if (text.length > 0) {
        set.add(key);
      }
    }
  });

  return [...set].map((key) => key.split(" ").map(Number) as [number, number]);
}

type AdventurePackItem = {
  code: string;
  imports: string[];
  metadata: Header;
};

async function extractAdventurePackItem(
  filePath: string,
): Promise<AdventurePackItem> {
  const code = await fsPromises.readFile(filePath, "utf8");

  const project = new TSProject({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile("not/a/real/file", code);

  const metadataComments = getTrivia(sourceFile).filter((range) =>
    /\@adventure\b/.test(getCodeAt(sourceFile, range)),
  );
  invariant(
    metadataComments.length === 1,
    "Expected exactly one metadata comment",
  );
  const metadata = parseMetadata(getCodeAt(sourceFile, metadataComments[0]));
  sourceFile.replaceText(metadataComments[0], "");

  const imports = new Set<string>();
  sourceFile.getImportDeclarations().forEach((decl) => {
    imports.add(decl.getModuleSpecifierValue());
    removeNode(decl, { preserveTrivia: true });
  });

  sourceFile.getExportDeclarations().forEach((decl) => {
    if (decl.getNamedExports().length === 0) {
      removeNode(decl, { preserveTrivia: false });
    }
  });

  const updatedCode = await formatCode(sourceFile.getFullText());

  return {
    code: updatedCode,
    imports: Array.from(imports),
    metadata,
  };
}

async function main(): Promise<void> {
  const fileEntries = await fsPromises.readdir("src", {
    withFileTypes: true,
  });

  const adventurePackItemsByPath: Record<string, AdventurePackItem> = {};

  for (const entry of fileEntries) {
    if (!entry.isFile()) {
      continue;
    }

    const filePath = path.join(entry.parentPath, entry.name);
    // eslint-disable-next-line no-await-in-loop
    const item = await extractAdventurePackItem(filePath);

    adventurePackItemsByPath[filePath] = item;
  }

  const adventurePackItemsByName: Record<string, AdventurePackItem> = {};
  const adventurePackNamesByPath: Record<string, string> = {};
  for (const [filePath, item] of Object.entries(adventurePackItemsByPath)) {
    const { name } = item.metadata;
    if (adventurePackItemsByName[name] != null) {
      throw new Error(`Duplicate item name: ${name}`);
    }

    adventurePackItemsByName[name] = item;
    adventurePackNamesByPath[filePath] = name;
  }

  for (const item of Object.values(adventurePackItemsByName)) {
    item.imports = item.imports.map((im) =>
      nullthrows(
        adventurePackNamesByPath[path.normalize(path.join("src", im + ".ts"))],
      ),
    );
  }

  if (Object.keys(adventurePackItemsByName).length === 0) {
    return;
  }

  await fsPromises.mkdir("dist", { recursive: true });
  await fsPromises.writeFile(
    path.join("dist", "items.json"),
    JSON.stringify(adventurePackItemsByName),
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
