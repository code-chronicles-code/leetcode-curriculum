import fsPromises from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

import { getLines, stripPrefixOrThrow } from "@code-chronicles/util";

const headerParser = z
  .object({ name: z.string().min(1).regex(/^\S/) })
  .strict();

type Header = z.infer<typeof headerParser>;

function parseHeader(header: string): Header {
  const lines = Array.from(getLines(header.trim()));
  lines[lines.length - 1] = lines[lines.length - 1].replace(/\*\/$/, "");
  lines[0] = lines[0].replace(/^\s*\/\*\*/, "");
  for (let i = 1; i < lines.length; ++i) {
    lines[i] = lines[i].replace(/^\s*\*\s*/, "");
  }

  return headerParser.parse(
    JSON.parse(stripPrefixOrThrow(lines.join("").trim(), "@adventure").trim()),
  );
}

function extractHeader(text: string): [Header | null, string] {
  const match = text.match(/^\s*(\/\*\*.*?\*\/)\s*(.*)/s);
  if (match == null) {
    return [null, text];
  }

  return [parseHeader(match[1]), match[2]];
}

async function extractData(
  filePath: string,
): Promise<{ content: string; header: Header } | null> {
  const content = await fsPromises.readFile(filePath, "utf8");
  const [header, contentWithoutHeader] = extractHeader(content);
  if (header == null) {
    return null;
  }

  return { content: contentWithoutHeader, header };
}

async function main(): Promise<void> {
  const fileEntries = await fsPromises.readdir("src", {
    withFileTypes: true,
  });

  const adventurePackItems: Record<string, string> = {};

  for (const entry of fileEntries) {
    if (!entry.isFile()) {
      continue;
    }

    const filePath = path.join(entry.parentPath, entry.name);
    // eslint-disable-next-line no-await-in-loop
    const data = await extractData(filePath);
    if (data == null) {
      continue;
    }

    adventurePackItems[data.header.name] = data.content;
  }

  if (Object.keys(adventurePackItems).length === 0) {
    return;
  }

  await fsPromises.mkdir("dist", { recursive: true });
  await fsPromises.writeFile(
    path.join("dist", "items.json"),
    JSON.stringify(adventurePackItems),
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
