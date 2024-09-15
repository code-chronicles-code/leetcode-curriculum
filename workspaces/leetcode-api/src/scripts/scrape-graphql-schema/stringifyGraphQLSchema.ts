import {
  DEFAULT_DEPRECATION_REASON,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLScalarType,
  buildSchema,
  printType,
  validateSchema,
  type GraphQLType,
} from "graphql";
import nullthrows from "nullthrows";
import prettier from "prettier";

import { compareStringsCaseInsensitive } from "@code-chronicles/util/compareStringsCaseInsensitive";
import { getRandomBytes } from "@code-chronicles/util/getRandomBytes";
import { invariantViolation } from "@code-chronicles/util/invariantViolation";
import { maybeThrow } from "@code-chronicles/util/maybeThrow";

import type { LeetCodeGraphQLType } from "../../fetchGraphQLTypeInformation.js";
import { encodeValue } from "./encodeValue.js";
import { getFakeScalarType } from "./getFakeScalarType.js";
import { parseEncodedValues } from "./parseEncodedValues.js";

export async function stringifyGraphQLSchema(
  types: readonly LeetCodeGraphQLType[],
): Promise<string> {
  // TODO: migrate to .toSorted once that's more common
  const sortedTypes = [...types].sort((a, b) =>
    compareStringsCaseInsensitive(a.name, b.name),
  );

  const scalars: GraphQLScalarType[] = [];
  const enums: GraphQLEnumType[] = [];
  const inputObjects: GraphQLInputObjectType[] = [];
  const interfaces: GraphQLInterfaceType[] = [];
  const objects: GraphQLObjectType[] = [];

  // Printing of default values was having some issues, so we are going to
  // bypass the normal mechanism and treat every default value as a string,
  // encode it, and later decode it. This marker will help us with parsing.
  const defaultValueMarker = (await getRandomBytes(64)).toString("hex");

  for (const typeInfo of sortedTypes) {
    switch (typeInfo.kind) {
      case "ENUM": {
        const graphqlType = new GraphQLEnumType({
          name: typeInfo.name,
          description: typeInfo.description,
          values: Object.fromEntries(
            nullthrows(typeInfo.enumValues).map((ev) => [
              ev.name,
              {
                description: ev.description,
                deprecationReason: ev.isDeprecated
                  ? (ev.deprecationReason ?? DEFAULT_DEPRECATION_REASON)
                  : undefined,
              },
            ]),
          ),
        });

        enums.push(graphqlType);
        break;
      }

      case "INPUT_OBJECT": {
        const graphqlType = new GraphQLInputObjectType({
          name: typeInfo.name,
          description: typeInfo.description,
          fields: Object.fromEntries(
            nullthrows(typeInfo.inputFields).map((field) => [
              field.name,
              {
                description: field.description,
                type: getFakeScalarType(field.type),
                defaultValue: encodeValue(
                  field.defaultValue,
                  defaultValueMarker,
                ),
              },
            ]),
          ),
        });

        inputObjects.push(graphqlType);
        break;
      }

      case "INTERFACE":
      case "OBJECT": {
        const classAndDestination =
          typeInfo.kind === "INTERFACE"
            ? ([GraphQLInterfaceType, interfaces] as const)
            : ([GraphQLObjectType, objects] as const);
        const graphqlType = new classAndDestination[0]({
          name: typeInfo.name,
          description: typeInfo.description,
          fields: Object.fromEntries(
            nullthrows(typeInfo.fields).map((field) => [
              field.name,
              {
                description: field.description,
                deprecationReason: field.isDeprecated
                  ? (field.deprecationReason ?? DEFAULT_DEPRECATION_REASON)
                  : undefined,
                type: getFakeScalarType(field.type),
                args: Object.fromEntries(
                  (field.args ?? []).map((arg) => [
                    arg.name,
                    {
                      description: arg.description,
                      type: getFakeScalarType(arg.type),
                      defaultValue: encodeValue(
                        arg.defaultValue,
                        defaultValueMarker,
                      ),
                    },
                  ]),
                ),
              },
            ]),
          ),
        });

        (classAndDestination[1] as GraphQLType[]).push(graphqlType);
        break;
      }

      case "SCALAR": {
        const graphqlType = new GraphQLScalarType({
          name: typeInfo.name,
          description: typeInfo.description,
        });

        scalars.push(graphqlType);
        break;
      }

      case "UNION": {
        invariantViolation(`Unsupported kind: ${typeInfo.kind}`);
        // @ts-expect-error Unreachable code -- `invariantViolation` throws.
        break;
      }

      case "LIST":
      case "NON_NULL":
      default: {
        invariantViolation(`Unexpected kind: ${typeInfo.kind}`);
        // @ts-expect-error Unreachable code -- `invariantViolation` throws.
        break;
      }
    }
  }

  const schemaWithEncodedDefaultValues = [
    scalars,
    enums,
    interfaces,
    inputObjects,
    objects,
  ]
    .flatMap((group) => group.map(printType))
    .join("\n\n");

  const schema = parseEncodedValues(
    schemaWithEncodedDefaultValues,
    defaultValueMarker,
  );

  maybeThrow(validateSchema(buildSchema(schema)));

  return await prettier.format(schema, { parser: "graphql" });
}
