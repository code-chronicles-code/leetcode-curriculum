import { readdir as readDirectory, readFile } from "node:fs/promises";
import path from "node:path";

import nullthrows from "nullthrows";

import { isStringEmptyOrWhitespaceOnly } from "@code-chronicles/util/isStringEmptyOrWhitespaceOnly";

import type {
  InnerType,
  LeetCodeGraphQLType,
} from "../fetchGraphQLTypeInformation";

function formatDescription(description: string | undefined): string {
  if (description == null || isStringEmptyOrWhitespaceOnly(description)) {
    return "";
  }

  return description.includes("\n") || description.includes('"')
    ? `"""\n${description}\n"""\n`
    : `"${description}"\n`;
}

function stringifyType(innerType: InnerType): string {
  if (innerType.kind === "LIST") {
    return "[" + stringifyType(nullthrows(innerType.ofType)) + "]";
  }

  if (innerType.kind === "NON_NULL") {
    return stringifyType(nullthrows(innerType.ofType)) + "!";
  }

  return nullthrows(innerType.name);
}

async function main(): Promise<void> {
  const fileEntries = await readDirectory("types", {
    withFileTypes: true,
  });

  const scalars: string[] = [];
  const enums: string[] = [];
  const interfaces: string[] = [];
  const objects: string[] = [];

  for (const entry of fileEntries) {
    if (!(entry.isFile() && entry.name.endsWith(".json"))) {
      continue;
    }

    const graphqlTypeInfo = JSON.parse(
      // eslint-disable-next-line no-await-in-loop
      await readFile(path.join("types", entry.name), "utf8"),
    ) as LeetCodeGraphQLType;

    // TODO: handle all the kind types
    switch (graphqlTypeInfo.kind) {
      case "ENUM": {
        const enumValues = nullthrows(graphqlTypeInfo.enumValues).map(
          (ev) => `${formatDescription(ev.description)}${ev.name}\n`,
        );
        enums.push(
          `${formatDescription(graphqlTypeInfo.description)}enum ${graphqlTypeInfo.name} {\n${enumValues.join("")}}\n`,
        );
        break;
      }
      case "INTERFACE":
      case "OBJECT": {
        const decl =
          graphqlTypeInfo.kind === "INTERFACE" ? "interface" : "type";
        const fields = nullthrows(graphqlTypeInfo.fields).map(
          (field) =>
            `${formatDescription(field.description)}${field.name}: ${stringifyType(field.type)}\n`,
        );

        // TODO: also include field arguments
        (graphqlTypeInfo.kind === "INTERFACE" ? interfaces : objects).push(
          `${formatDescription(graphqlTypeInfo.description)}${decl} ${graphqlTypeInfo.name} {\n${fields.join("")}}\n`,
        );
        break;
      }
      case "SCALAR": {
        scalars.push(
          `${formatDescription(graphqlTypeInfo.description)}scalar ${graphqlTypeInfo.name}\n`,
        );
        break;
      }
    }
  }

  console.log([...scalars, ...enums, ...interfaces, ...objects].join("\n"));
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
