import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { buildSchema } from "graphql";
import invariant from "invariant";

import { popMany } from "@code-chronicles/util/popMany";
import { sleep } from "@code-chronicles/util/sleep";

import { SCHEMA_FILE } from "./constants";
import {
  fetchGraphQLTypeInformation,
  type InnerType,
} from "../fetchGraphQLTypeInformation";

const BATCH_SIZE = 50;

const OPTIONAL_TYPES = new Set(["Subscription"]);

async function getSeedTypeNames(): Promise<string[]> {
  // Start with some built-in types.
  const res = new Set([
    "Query",
    "Mutation",
    "Subscription",
    "__Schema",
    "__Type",
    "__Directive",
    "__EnumValue",
    "__InputValue",
    "__Field",
    "Int",
    "Float",
    "String",
    "Boolean",
    "ID",
  ]);

  // Try to read additional types from the saved schema file.
  try {
    const schema = buildSchema(await readFile(SCHEMA_FILE, "utf8"));
    Object.keys(schema.getTypeMap()).forEach((typeName) => {
      res.add(typeName);
    });
  } catch (err) {
    console.error(err);
  }

  return [...res].sort();
}

async function main(): Promise<void> {
  const stack: string[] = [];
  const visited = new Set<string>();
  const pushTypeName = (typeName: string) => {
    if (!/^[A-Za-z0-9_]+$/.test(typeName)) {
      throw new Error("Bad type name " + typeName);
    }

    if (visited.has(typeName)) {
      return;
    }

    visited.add(typeName);
    stack.push(typeName);
  };

  const pushType = (innerType: InnerType) => {
    if (innerType.name != null) {
      pushTypeName(innerType.name);
    }

    if (innerType.ofType != null) {
      pushType(innerType.ofType);
    }
  };

  (await getSeedTypeNames()).forEach(pushTypeName);

  while (stack.length > 0) {
    const typeNames = popMany(stack, BATCH_SIZE);
    console.error(`Fetching ${typeNames.join(", ")}, ${stack.length} to go`);

    // eslint-disable-next-line no-await-in-loop
    const graphqlTypeInfos = await fetchGraphQLTypeInformation(typeNames);

    // eslint-disable-next-line no-await-in-loop
    await Promise.all(
      typeNames.map(async (typeName) => {
        const graphqlTypeInfo = graphqlTypeInfos[typeName];
        if (graphqlTypeInfo == null) {
          invariant(
            OPTIONAL_TYPES.has(typeName),
            `${typeName} is not an optional type!`,
          );
          return;
        }

        await writeFile(
          path.join("types", `${typeName}.json`),
          JSON.stringify(graphqlTypeInfo, null, 2) + "\n",
        );

        for (const field of graphqlTypeInfo.fields ?? []) {
          pushType(field.type);
          for (const arg of field.args ?? []) {
            pushType(arg.type);
          }
        }

        for (const inputField of graphqlTypeInfo.inputFields ?? []) {
          pushType(inputField.type);
        }

        for (const iface of graphqlTypeInfo.interfaces ?? []) {
          pushType(iface);
        }

        for (const possibleType of graphqlTypeInfo.possibleTypes ?? []) {
          pushType(possibleType);
        }
      }),
    );

    // eslint-disable-next-line no-await-in-loop
    await sleep(3000);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
