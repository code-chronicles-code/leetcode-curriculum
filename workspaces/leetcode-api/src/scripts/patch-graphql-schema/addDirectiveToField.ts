import {
  Kind,
  type FieldDefinitionNode,
  type InterfaceTypeDefinitionNode,
  type ObjectTypeDefinitionNode,
} from "graphql";
import immutableUpdate from "immutability-helper";
import { nameNode } from "./astNodeBuilders.ts";

// TODO: keep in sync with DirectivesConfig in graphqlToZod

export const CUSTOM_DIRECTIVES = ["nonnegative", "slug", "trim"] as const;

// TODO: memoize by directiveName?

export function addDirectiveToField(
  directiveName: (typeof CUSTOM_DIRECTIVES)[number],
): (
  field: FieldDefinitionNode,
  objectOrInterface: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
) => FieldDefinitionNode {
  return (field, objectOrInterface) =>
    immutableUpdate(field, {
      directives(prevDirectives = []) {
        if (prevDirectives.some((d) => d.name.value === directiveName)) {
          console.error(
            `${objectOrInterface.name.value}.${field.name.value} already has the @${directiveName} directive!`,
          );
          return prevDirectives;
        }

        return [
          ...prevDirectives,
          {
            kind: Kind.DIRECTIVE,
            name: nameNode(directiveName),
          },
        ];
      },
    });
}
