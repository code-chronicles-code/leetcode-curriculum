import { writeFile } from "node:fs/promises";
import path from "node:path";

import nullthrows from "nullthrows";

import { sleep } from "@code-chronicles/util/sleep";

import {
  fetchGraphQLTypeInformation,
  type InnerType,
} from "../fetchGraphQLTypeInformation";

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

  "Query Mutation Subscription __Schema __Type __Directive __EnumValue __InputValue __Field"
    .split(" ")
    .forEach(pushTypeName);

  while (stack.length > 0) {
    const typeName = nullthrows(stack.pop());
    console.log(`Fetching ${typeName}, ${stack.length} to go`);

    const graphqlTypeInfo = nullthrows(
      // eslint-disable-next-line no-await-in-loop
      await fetchGraphQLTypeInformation(typeName),
    );

    // eslint-disable-next-line no-await-in-loop
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

    // eslint-disable-next-line no-await-in-loop
    await sleep(3000);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
