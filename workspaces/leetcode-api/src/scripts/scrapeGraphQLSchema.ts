import { writeFile } from "node:fs/promises";

import { buildSchema, validateSchema } from "graphql";
import invariant from "invariant";

import { isNonNullish } from "@code-chronicles/util/isNonNullish";
import { maybeThrow } from "@code-chronicles/util/maybeThrow";
import { popMany } from "@code-chronicles/util/popMany";
import { sleep } from "@code-chronicles/util/sleep";
import { whileReturnsTrueAsync } from "@code-chronicles/util/whileReturnsTrueAsync";

import { SCHEMA_FILE } from "../graphql-extraction/constants";
import {
  fetchGraphQLTypeInformation,
  type InnerType,
  type LeetCodeGraphQLType,
} from "../fetchGraphQLTypeInformation";
import { outputGraphQLSchema } from "../graphql-extraction/outputGraphQLSchema";
import { readSeedGraphQLTypeNames } from "../graphql-extraction/readSeedGraphQLTypeNames";

const BATCH_SIZE = 100;

const OPTIONAL_TYPES = new Set(["Subscription"]);

async function main(): Promise<void> {
  const stack: string[] = [];
  const typeInfos = new Map<string, LeetCodeGraphQLType | null>();
  const pushTypeName = (typeName: string) => {
    if (!/^[A-Za-z0-9_]+$/.test(typeName)) {
      throw new Error("Bad type name " + typeName);
    }

    if (typeInfos.has(typeName)) {
      return;
    }

    typeInfos.set(typeName, null);
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

  (await readSeedGraphQLTypeNames()).forEach(pushTypeName);

  await whileReturnsTrueAsync(async () => {
    const typeNames = popMany(stack, BATCH_SIZE);
    console.error(`Fetching ${typeNames.join(", ")}, ${stack.length} to go`);

    const typeInfosBatch = await fetchGraphQLTypeInformation(typeNames);

    for (const typeName of typeNames) {
      const typeInfo = typeInfosBatch[typeName];
      if (typeInfo == null) {
        invariant(
          OPTIONAL_TYPES.has(typeName),
          `${typeName} is not an optional type!`,
        );
        continue;
      }

      typeInfos.set(typeName, typeInfo);

      for (const field of typeInfo.fields ?? []) {
        pushType(field.type);
        for (const arg of field.args ?? []) {
          pushType(arg.type);
        }
      }

      for (const inputField of typeInfo.inputFields ?? []) {
        pushType(inputField.type);
      }

      for (const iface of typeInfo.interfaces ?? []) {
        pushType(iface);
      }

      for (const possibleType of typeInfo.possibleTypes ?? []) {
        pushType(possibleType);
      }
    }

    if (stack.length === 0) {
      return false;
    }

    await sleep(3000);
    return true;
  });

  const schema = await outputGraphQLSchema(
    [...typeInfos.values()].filter(isNonNullish),
  );

  maybeThrow(validateSchema(buildSchema(schema)));

  await writeFile(SCHEMA_FILE, schema);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
