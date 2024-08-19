import { readdir as readDirectory, readFile } from "node:fs/promises";
import path from "node:path";

import nullthrows from "nullthrows";

import { invariantViolation } from "@code-chronicles/util/invariantViolation";
import { isStringEmptyOrWhitespaceOnly } from "@code-chronicles/util/isStringEmptyOrWhitespaceOnly";
import { promiseAllLimitingConcurrency } from "@code-chronicles/util/promiseAllLimitingConcurrency";

import type {
  InnerType,
  LeetCodeGraphQLType,
} from "../fetchGraphQLTypeInformation";
import { compareStrings } from "@code-chronicles/util/compareStrings";

const CONCURRENT_READS = 20;

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
  const inputObjects: string[] = [];
  const interfaces: string[] = [];
  const objects: string[] = [];

  await promiseAllLimitingConcurrency(
    fileEntries
      .sort((a, b) => compareStrings(a.name, b.name))
      .map((entry) => async () => {
        if (!(entry.isFile() && entry.name.endsWith(".json"))) {
          return;
        }

        const graphqlTypeInfo = JSON.parse(
          await readFile(path.join("types", entry.name), "utf8"),
        ) as LeetCodeGraphQLType;

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
                          `${formatDescription(arg.description)}${arg.name}: ${stringifyType(arg.type)}` +
                          (arg.defaultValue != null
                            ? " = " + arg.defaultValue
                            : ""),
                      )
                      .join("\n") +
                    "\n)"
                  : "";
              return `${formatDescription(field.description)}${field.name}${args}: ${stringifyType(field.type)}\n`;
            });

            const destination = {
              INPUT_OBJECT: inputObjects,
              INTERFACE: interfaces,
              OBJECT: objects,
            }[graphqlTypeInfo.kind];
            destination.push(
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

  console.log(
    [...scalars, ...enums, ...interfaces, ...inputObjects, ...objects].join(
      "\n",
    ),
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
