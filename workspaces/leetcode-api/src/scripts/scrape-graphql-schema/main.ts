import invariant from "invariant";

import { filterMapValues } from "@code-chronicles/util/filterMapValues";
import { isNonNullish } from "@code-chronicles/util/isNonNullish";
import { popMany } from "@code-chronicles/util/popMany";
import { sleep } from "@code-chronicles/util/sleep";
import { whileReturnsTrueAsync } from "@code-chronicles/util/whileReturnsTrueAsync";

import { SCHEMA_ORIGINAL_FILE, SCHEMA_PATCHED_FILE } from "./constants.ts";
import {
  fetchGraphQLTypeInformation,
  type InnerType,
  type LeetCodeGraphQLType,
} from "../../fetchGraphQLTypeInformation.ts";
import { patchGraphQLSchema } from "./patchGraphQLSchema.ts";
import { readSeedGraphQLTypeNames } from "./readSeedGraphQLTypeNames.ts";
import { writeGraphQLSchemaFile } from "./writeGraphQLSchemaFile.ts";

const BATCH_SIZE = 100;

const OPTIONAL_TYPES = new Set(["Subscription"]);

async function main(): Promise<void> {
  const fetchStack: string[] = [];
  const typeInfos = new Map<string, LeetCodeGraphQLType | null>();
  const pushTypeName = (typeName: string) => {
    invariant(/^[A-Za-z0-9_]+$/.test(typeName), "Bad type name " + typeName);

    if (typeInfos.has(typeName)) {
      return;
    }

    typeInfos.set(typeName, null);
    fetchStack.push(typeName);
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
    const typeNames = popMany(fetchStack, BATCH_SIZE);
    console.error(
      `Fetching ${typeNames.join(", ")}, ${fetchStack.length} to go`,
    );

    const typeInfosBatch = await fetchGraphQLTypeInformation(
      typeNames,
      (errors) => {
        errors.forEach((err) => {
          console.error("Got GraphQLError", err);
        });
      },
    );

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

    if (fetchStack.length === 0) {
      return false;
    }

    await sleep(3000);
    return true;
  });

  const nonNullishTypeInfos = filterMapValues(typeInfos, isNonNullish);

  await Promise.all([
    writeGraphQLSchemaFile(SCHEMA_ORIGINAL_FILE, nonNullishTypeInfos.values()),
    writeGraphQLSchemaFile(
      SCHEMA_PATCHED_FILE,
      patchGraphQLSchema(nonNullishTypeInfos).values(),
    ),
  ]);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
