import {
  Kind,
  type FieldDefinitionNode,
  type InterfaceTypeDefinitionNode,
  type ObjectTypeDefinitionNode,
} from "graphql";
import immutableUpdate from "immutability-helper";

export const CUSTOM_DIRECTIVES = ["nonnegative"] as const;

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
            name: {
              kind: Kind.NAME,
              value: directiveName,
            },
          },
        ];
      },
    });
}
