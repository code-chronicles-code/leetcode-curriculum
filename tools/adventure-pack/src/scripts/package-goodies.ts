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
  sortObjectKeys,
  stripPrefixOrThrow,
  stripSuffixOrThrow,
} from "@code-chronicles/util";

const GOODIES_DIRECTORY = path.join("goodies", "typescript");

const metadataParser = z.object({}).strict();

type Metadata = z.infer<typeof metadataParser>;

function parseMetadata(metadata: string): Metadata {
  const lines = Array.from(getLines(metadata.trim()));
  lines[0] = lines[0].replace(/^\s*\/\*\*\s*/, "");
  lines[lines.length - 1] = lines[lines.length - 1].replace(/\s*\*\/$/, "");
  for (let i = 1; i < lines.length; ++i) {
    lines[i] = lines[i].replace(/^\s*\*\s*/, "");
  }

  return metadataParser.parse(
    JSON.parse(stripPrefixOrThrow(lines.join("").trim(), "@goody").trim()),
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

type Goody = {
  code: string;
  imports: string[];
  metadata: Metadata;
  name: string;
};

async function extractGoody(name: string): Promise<Goody> {
  const code = await fsPromises.readFile(
    path.join(GOODIES_DIRECTORY, name, "index.ts"),
    "utf8",
  );

  const project = new TSProject({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile("not/a/real/file", code);

  const metadataComments = getTrivia(sourceFile).filter((range) =>
    /\@goody\b/.test(getCodeAt(sourceFile, range)),
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
    name,
  };
}

async function main(): Promise<void> {
  const fileEntries = await fsPromises.readdir(GOODIES_DIRECTORY, {
    withFileTypes: true,
  });

  const goodiesByName: Record<string, Goody> = {};
  const registerGoody = (goody: Goody): void => {
    invariant(
      goodiesByName[goody.name] == null,
      `Goody ${goody.name} already exists!`,
    );
    goodiesByName[goody.name] = goody;
  };

  for (const entry of fileEntries) {
    if (!entry.isDirectory()) {
      continue;
    }

    // eslint-disable-next-line no-await-in-loop
    const goody = await extractGoody(entry.name);
    invariant(goody.name === entry.name, "Mismatched goody name!");
    registerGoody(goody);
  }

  for (const goody of Object.values(goodiesByName)) {
    goody.imports = goody.imports
      .map((im) => {
        const res = stripPrefixOrThrow(im, "../");
        invariant(
          goodiesByName[res] != null,
          `Unknown import ${JSON.stringify(im)} in ${goody.name}`,
        );
        return res;
      })
      .sort();
  }

  if (Object.keys(goodiesByName).length === 0) {
    return;
  }

  await fsPromises.mkdir("dist", { recursive: true });
  await fsPromises.writeFile(
    path.join("dist", "goodies.json"),
    JSON.stringify(sortObjectKeys(goodiesByName)) + "\n",
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
