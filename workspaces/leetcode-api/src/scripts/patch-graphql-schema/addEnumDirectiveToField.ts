import {
  Kind,
  type FieldDefinitionNode,
  type InterfaceTypeDefinitionNode,
  type ObjectTypeDefinitionNode,
} from "graphql";
import immutableUpdate from "immutability-helper";
import { nameNode } from "./astNodeBuilders.ts";

export const DIRECTIVE_NAME = "enum";
export const DIRECTIVE_ARGUMENT_NAME = "values";

export function addEnumDirectiveToField(
  values: readonly string[],
): (
  field: FieldDefinitionNode,
  objectOrInterface: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
) => FieldDefinitionNode {
  return (field, objectOrInterface) =>
    immutableUpdate(field, {
      directives(prevDirectives = []) {
        if (prevDirectives.some((d) => d.name.value === DIRECTIVE_NAME)) {
          console.error(
            `${objectOrInterface.name.value}.${field.name.value} already has the @${DIRECTIVE_NAME} directive!`,
          );
          return prevDirectives;
        }

        return [
          ...prevDirectives,
          {
            kind: Kind.DIRECTIVE,
            name: nameNode(DIRECTIVE_NAME),
            arguments: [
              {
                kind: Kind.ARGUMENT,
                name: nameNode(DIRECTIVE_ARGUMENT_NAME),
                value: {
                  kind: Kind.LIST,
                  values: values.map((value) => ({
                    kind: Kind.STRING,
                    value,
                  })),
                },
              },
            ],
          },
        ];
      },
    });
}
