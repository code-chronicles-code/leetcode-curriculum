import {
  readdir as readDirectory,
  readFile,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

import { buildSchema, validateSchema } from "graphql";
import nullthrows from "nullthrows";
import * as prettier from "prettier";

import { compareStringsCaseInsensitive } from "@code-chronicles/util/compareStringsCaseInsensitive";
import { invariantViolation } from "@code-chronicles/util/invariantViolation";
import { isStringEmptyOrWhitespaceOnly } from "@code-chronicles/util/isStringEmptyOrWhitespaceOnly";
import { maybeThrow } from "@code-chronicles/util/maybeThrow";
import { promiseAllLimitingConcurrency } from "@code-chronicles/util/promiseAllLimitingConcurrency";

import type {
  InnerType,
  LeetCodeGraphQLType,
} from "../fetchGraphQLTypeInformation";
import { SCHEMA_FILE } from "./constants";

const CONCURRENT_READS = 20;

function formatString(description: string | undefined): string {
  if (description == null || isStringEmptyOrWhitespaceOnly(description)) {
    return "";
  }

  return description.includes("\n") || description.includes('"')
    ? `"""\n${description}\n"""\n`
    : `"${description}"\n`;
}

function formatDeprecation(
  deprecationReason: string | null | undefined,
): string {
  return (
    "@deprecated" +
    (deprecationReason == null
      ? ""
      : `(reason: ${formatString(deprecationReason)})`)
  );
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

type Entry = {
  key: string;
  content: string;
};

async function main(): Promise<void> {
  const fileEntries = await readDirectory("types", {
    withFileTypes: true,
  });

  const scalars: Entry[] = [];
  const enums: Entry[] = [];
  const inputObjects: Entry[] = [];
  const interfaces: Entry[] = [];
  const objects: Entry[] = [];

  await promiseAllLimitingConcurrency(
    fileEntries.map((entry) => async () => {
      if (!(entry.isFile() && entry.name.endsWith(".json"))) {
        return;
      }

      const graphqlTypeInfo = JSON.parse(
        await readFile(path.join("types", entry.name), "utf8"),
      ) as LeetCodeGraphQLType;

      switch (graphqlTypeInfo.kind) {
        case "ENUM": {
          const enumValues = nullthrows(graphqlTypeInfo.enumValues).map(
            (ev) =>
              `${formatString(ev.description)}${ev.name} ${ev.isDeprecated ? formatDeprecation(ev.deprecationReason) : ""}\n`,
          );
          enums.push({
            key: graphqlTypeInfo.name,
            content: `${formatString(graphqlTypeInfo.description)}enum ${graphqlTypeInfo.name} {\n${enumValues.join("")}}\n`,
          });
          break;
        }
        case "INPUT_OBJECT":
        case "INTERFACE":
        case "OBJECT": {
          const decl = {
            INPUT_OBJECT: "input",
            INTERFACE: "interface",
            OBJECT: "type",
          }[graphqlTypeInfo.kind];
          const fields = [
            ...(graphqlTypeInfo.fields ?? []),
            ...(graphqlTypeInfo.inputFields ?? []),
          ].map((field) => {
            const args =
              "args" in field && field.args && field.args.length > 0
                ? "(\n" +
                  field.args
                    .map(
                      (arg) =>
                        `${formatString(arg.description)}${arg.name}: ${stringifyType(arg.type)}` +
                        (arg.defaultValue != null
                          ? " = " + arg.defaultValue
                          : ""),
                    )
                    .join("\n") +
                  "\n)"
                : "";
            const deprecation =
              "isDeprecated" in field && field.isDeprecated
                ? formatDeprecation(field.deprecationReason)
                : "";
            return `${formatString(field.description)}${field.name}${args}: ${stringifyType(field.type)} ${deprecation}\n`;
          });

          const destination = {
            INPUT_OBJECT: inputObjects,
            INTERFACE: interfaces,
            OBJECT: objects,
          }[graphqlTypeInfo.kind];
          destination.push({
            key: graphqlTypeInfo.name,
            content: `${formatString(graphqlTypeInfo.description)}${decl} ${graphqlTypeInfo.name} {\n${fields.join("")}}\n`,
          });
          break;
        }
        case "SCALAR": {
          scalars.push({
            key: graphqlTypeInfo.name,
            content: `${formatString(graphqlTypeInfo.description)}scalar ${graphqlTypeInfo.name}\n`,
          });
          break;
        }
        case "LIST":
        case "UNION":
        case "NON_NULL":
        default: {
          invariantViolation(`Unexpected kind: ${graphqlTypeInfo.kind}`);
        }
      }
    }),
    CONCURRENT_READS,
  );

  const sections = [scalars, enums, interfaces, inputObjects, objects];
  for (const section of sections) {
    section.sort((a, b) => compareStringsCaseInsensitive(a.key, b.key));
  }

  const schema = sections
    .flatMap((section) => section.map((entry) => entry.content))
    .join("\n");

  maybeThrow(validateSchema(buildSchema(schema)));

  await writeFile(
    SCHEMA_FILE,
    await prettier.format(schema, { parser: "graphql" }),
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
