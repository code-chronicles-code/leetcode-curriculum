import { Node as TSNode } from "ts-morph";

import { stripSuffixOrThrow } from "@code-chronicles/util/stripSuffixOrThrow";

export function removeNode(
  node: TSNode,
  { preserveTrivia = true }: { preserveTrivia?: boolean } = {},
): void {
  if (preserveTrivia) {
    node.replaceWithText(
      stripSuffixOrThrow(node.getText(true), node.getText(false)),
    );
  } else {
    node
      .getSourceFile()
      .replaceText([node.getPos(), node.getPos() + node.getFullWidth()], "");
  }
}
