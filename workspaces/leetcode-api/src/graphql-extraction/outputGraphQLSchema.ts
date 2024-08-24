import {
  GraphQLEnumType,
  GraphQLScalarType,
  GraphQLList,
  buildSchema,
  printType,
  validateSchema,
  GraphQLInputObjectType,
  GraphQLNonNull,
  type GraphQLType,
  assertInputType,
  GraphQLInterfaceType,
  assertOutputType,
  GraphQLObjectType,
  DEFAULT_DEPRECATION_REASON,
  isScalarType,
} from "graphql";
import nullthrows from "nullthrows";
import * as prettier from "prettier";

import { compareStringsCaseInsensitive } from "@code-chronicles/util/compareStringsCaseInsensitive";
import { invariantViolation } from "@code-chronicles/util/invariantViolation";
import { maybeThrow } from "@code-chronicles/util/maybeThrow";

import type {
  InnerType,
  LeetCodeGraphQLType,
} from "../fetchGraphQLTypeInformation";

function getUnderlyingType(innerType: InnerType): InnerType {
  if (innerType.kind === "LIST" || innerType.kind === "NON_NULL") {
    return getUnderlyingType(nullthrows(innerType.ofType));
  }

  return innerType;
}

export async function outputGraphQLSchema(
  types: readonly LeetCodeGraphQLType[],
): Promise<string> {
  // TODO: migrate to .toSorted once that's more common
  const sortedTypes = [...types].sort((a, b) =>
    compareStringsCaseInsensitive(a.name, b.name),
  );

  const typesByName = new Map<string, GraphQLType>();
  const getType = (innerType: InnerType): GraphQLType => {
    if (innerType.kind === "LIST") {
      return new GraphQLList(getType(nullthrows(innerType.ofType)));
    }

    if (innerType.kind === "NON_NULL") {
      return new GraphQLNonNull(getType(nullthrows(innerType.ofType)));
    }

    const typeName = nullthrows(innerType.name);
    return nullthrows(typesByName.get(typeName));
  };

  const scalars: GraphQLScalarType[] = [];
  const enums: GraphQLEnumType[] = [];
  const inputObjects: GraphQLInputObjectType[] = [];
  const interfaces: GraphQLInterfaceType[] = [];
  const objects: GraphQLObjectType[] = [];

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
        typesByName.set(graphqlType.name, graphqlType);
        break;
      }

      case "INPUT_OBJECT": {
        const graphqlType = new GraphQLInputObjectType({
          name: typeInfo.name,
          description: typeInfo.description,
          fields: () =>
            Object.fromEntries(
              nullthrows(typeInfo.inputFields).map((field) => [
                field.name,
                {
                  description: field.description,
                  type: assertInputType(getType(field.type)),
                },
              ]),
            ),
        });

        inputObjects.push(graphqlType);
        typesByName.set(graphqlType.name, graphqlType);
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
          fields: () =>
            Object.fromEntries(
              nullthrows(typeInfo.fields).map((field) => [
                field.name,
                {
                  description: field.description,
                  deprecationReason: field.isDeprecated
                    ? (field.deprecationReason ?? DEFAULT_DEPRECATION_REASON)
                    : undefined,
                  type: assertOutputType(getType(field.type)),
                  args: Object.fromEntries(
                    (field.args ?? []).map((arg) => [
                      arg.name,
                      {
                        description: arg.description,
                        type: assertInputType(getType(arg.type)),
                        defaultValue: (() => {
                          if (arg.defaultValue == null) {
                            return undefined;
                          }

                          const underlyingArgType = getType(
                            getUnderlyingType(arg.type),
                          );

                          (
                            underlyingArgType as unknown as Record<
                              string,
                              unknown
                            >
                          ).serialize = function (
                            this: GraphQLType,
                            s: string,
                          ) {
                            try {
                              const parsed = JSON.parse(s);
                              if (
                                typeof parsed === "boolean" ||
                                typeof parsed === "number" ||
                                (typeof parsed === "string" &&
                                  isScalarType(this))
                              ) {
                                return parsed;
                              }
                            } catch {}

                            return s;
                          };

                          return arg.defaultValue;
                        })(),
                      },
                    ]),
                  ),
                },
              ]),
            ),
        });

        (classAndDestination[1] as GraphQLType[]).push(graphqlType);
        typesByName.set(graphqlType.name, graphqlType);
        break;
      }

      case "SCALAR": {
        const graphqlType = new GraphQLScalarType({
          name: typeInfo.name,
          description: typeInfo.description,
        });

        scalars.push(graphqlType);
        typesByName.set(graphqlType.name, graphqlType);
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

  const schema = [scalars, enums, interfaces, inputObjects, objects]
    .flatMap((group) => group.map(printType))
    .join("\n\n");

  maybeThrow(validateSchema(buildSchema(schema)));

  return await prettier.format(schema, { parser: "graphql" });
}
