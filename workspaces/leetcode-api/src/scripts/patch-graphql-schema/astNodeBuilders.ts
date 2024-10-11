import {
  Kind,
  type ListTypeNode,
  type NameNode,
  type NonNullTypeNode,
} from "graphql";

export function nonNullTypeNode(
  type: NonNullTypeNode["type"],
): NonNullTypeNode {
  return {
    kind: Kind.NON_NULL_TYPE,
    type,
  };
}

export function listTypeNode(type: ListTypeNode["type"]): ListTypeNode {
  return {
    kind: Kind.LIST_TYPE,
    type,
  };
}

export function nameNode(name: string): NameNode {
  return {
    kind: Kind.NAME,
    value: name,
  };
}
