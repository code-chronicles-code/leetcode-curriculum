import fsPromises from "node:fs/promises";
import path from "node:path";

import nullthrows from "nullthrows";

import type { LeetCodeGraphQLType } from "../fetchGraphQLTypeInformation";

function formatDescription(description: string | undefined): string {
  if (description == null) {
    return "";
  }

  return description.includes("\n") || description.includes('"')
    ? `"""\n${description}\n"""\n`
    : `"${description}"\n`;
}

async function main(): Promise<void> {
  const fileEntries = await fsPromises.readdir("types", {
    withFileTypes: true,
  });

  const scalars: string[] = [];
  const enums: string[] = [];

  for (const entry of fileEntries) {
    if (!(entry.isFile() && entry.name.endsWith(".json"))) {
      continue;
    }

    const graphqlTypeInfo = JSON.parse(
      // eslint-disable-next-line no-await-in-loop
      await fsPromises.readFile(path.join("types", entry.name), "utf8"),
    ) as LeetCodeGraphQLType;
    if (graphqlTypeInfo.kind === "SCALAR") {
      scalars.push(
        `${formatDescription(graphqlTypeInfo.description)}scalar ${graphqlTypeInfo.name}\n`,
      );
    }

    if (graphqlTypeInfo.kind === "ENUM") {
      const enumValues = nullthrows(graphqlTypeInfo.enumValues).map(
        (ev) => `${formatDescription(ev.description)}${ev.name}\n`,
      );
      enums.push(`enum ${graphqlTypeInfo.name} {\n${enumValues.join("")}}\n`);
    }
  }

  console.log([...scalars, ...enums].join("\n"));
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
