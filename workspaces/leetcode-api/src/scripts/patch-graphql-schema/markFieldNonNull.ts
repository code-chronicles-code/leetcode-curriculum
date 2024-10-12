import {
  Kind,
  type FieldDefinitionNode,
  type InterfaceTypeDefinitionNode,
  type NonNullTypeNode,
  type ObjectTypeDefinitionNode,
} from "graphql";
import immutableUpdate from "immutability-helper";

export function markFieldNonNull(
  field: FieldDefinitionNode,
  objectOrInterface: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
): FieldDefinitionNode {
  return immutableUpdate(field, {
    type(prevType): NonNullTypeNode {
      if (prevType.kind === Kind.NON_NULL_TYPE) {
        console.error(
          `${objectOrInterface.name.value}.${field.name.value} is already non-null!`,
        );
        return prevType;
      }

      return { kind: Kind.NON_NULL_TYPE, type: prevType };
    },
  });
}
