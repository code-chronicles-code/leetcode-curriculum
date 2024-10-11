import type { ASTNode } from "graphql";
import invariant from "invariant";
import nullthrows from "nullthrows";

export function assertSingleASTNode<T extends ASTNode>(
  nodeOrNodes: T | readonly T[] | null | undefined,
): NonNullable<T> {
  invariant(!Array.isArray(nodeOrNodes), "Got an array");
  return nullthrows(nodeOrNodes) as T;
}
