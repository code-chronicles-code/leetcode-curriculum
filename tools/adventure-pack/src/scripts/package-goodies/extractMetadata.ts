import invariant from "invariant";
import { SourceFile as TSSourceFile } from "ts-morph";
import { z } from "zod";

import { getLines, stripPrefixOrThrow } from "@code-chronicles/util";

import { getCodeAt } from "./getCodeAt";
import { getTrivia } from "./getTrivia";

const metadataParser = z.object({}).strict();

export type Metadata = z.infer<typeof metadataParser>;

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

export function extractMetadata(sourceFile: TSSourceFile): Metadata {
  const metadataComments = getTrivia(sourceFile).filter((range) =>
    /\@goody\b/.test(getCodeAt(sourceFile, range)),
  );
  invariant(
    metadataComments.length === 1,
    "Expected exactly one metadata comment",
  );

  const metadata = parseMetadata(getCodeAt(sourceFile, metadataComments[0]));
  sourceFile.replaceText(metadataComments[0], "");
  return metadata;
}
