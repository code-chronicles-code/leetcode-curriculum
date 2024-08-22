import {
  GraphQLScalarType,
  GraphQLEnumType,
  buildSchema,
  printType,
  validateSchema,
} from "graphql";
import nullthrows from "nullthrows";
import * as prettier from "prettier";

import { compareStringsCaseInsensitive } from "@code-chronicles/util/compareStringsCaseInsensitive";
import { invariantViolation } from "@code-chronicles/util/invariantViolation";
import { maybeThrow } from "@code-chronicles/util/maybeThrow";

import type { LeetCodeGraphQLType } from "../fetchGraphQLTypeInformation";
import { outputGraphQLDeprecatedDirective } from "./outputGraphQLDeprecatedDirective";
import { outputGraphQLTypeAnnotation } from "./outputGraphQLTypeAnnotation";
import { outputGraphQLString } from "./outputGraphQLString";

export async function outputGraphQLSchema(
  types: readonly LeetCodeGraphQLType[],
): Promise<string> {
  // TODO: migrate to .toSorted once that's more common
  const sortedTypes = [...types].sort((a, b) =>
    compareStringsCaseInsensitive(a.name, b.name),
  );

  const scalars: GraphQLScalarType[] = [];
  const enums: GraphQLEnumType[] = [];
  const inputObjects: string[] = [];
  const interfaces: string[] = [];
  const objects: string[] = [];

  for (const typeInfo of sortedTypes) {
    switch (typeInfo.kind) {
      case "ENUM": {
        enums.push(
          new GraphQLEnumType({
            name: typeInfo.name,
            description: typeInfo.description,
            values: Object.fromEntries(
              nullthrows(typeInfo.enumValues).map((ev) => [
                ev.name,
                {
                  description: ev.description,
                  deprecationReason: ev.isDeprecated
                    ? nullthrows(ev.deprecationReason)
                    : undefined,
                },
              ]),
            ),
          }),
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
        }[typeInfo.kind];
        const fields = [
          ...(typeInfo.fields ?? []),
          ...(typeInfo.inputFields ?? []),
        ].map((field) => {
          const args =
            "args" in field && field.args && field.args.length > 0
              ? "(\n" +
                field.args
                  .map(
                    (arg) =>
                      `${outputGraphQLString(arg.description)} ${arg.name}: ${outputGraphQLTypeAnnotation(arg.type)}` +
                      (arg.defaultValue != null
                        ? " = " + arg.defaultValue
                        : ""),
                  )
                  .join("\n") +
                "\n)"
              : "";

          return [
            outputGraphQLString(field.description),
            field.name,
            args,
            ":",
            outputGraphQLTypeAnnotation(field.type),
            "isDeprecated" in field && field.isDeprecated
              ? outputGraphQLDeprecatedDirective(field.deprecationReason)
              : "",
          ].join(" ");
        });

        const destination = {
          INPUT_OBJECT: inputObjects,
          INTERFACE: interfaces,
          OBJECT: objects,
        }[typeInfo.kind];
        destination.push(
          `${outputGraphQLString(typeInfo.description)} ${decl} ${typeInfo.name} { ${fields.join("\n")} }`,
        );
        break;
      }

      case "SCALAR": {
        scalars.push(
          new GraphQLScalarType({
            name: typeInfo.name,
            description: typeInfo.description,
          }),
        );
        break;
      }

      case "UNION": {
        invariantViolation(`Unsupported kind: ${typeInfo.kind}`);
      }

      case "LIST":
      case "NON_NULL":
      default: {
        invariantViolation(`Unexpected kind: ${typeInfo.kind}`);
      }
    }
  }

  const schema = [
    scalars.map(printType),
    enums.map(printType),
    interfaces,
    inputObjects,
    objects,
  ]
    .flat()
    .join("\n\n");

  maybeThrow(validateSchema(buildSchema(schema)));

  return await prettier.format(schema, { parser: "graphql" });
}
