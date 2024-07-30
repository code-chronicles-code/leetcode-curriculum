import type { Node as TSNode } from "ts-morph";

export function getTrailingTriviaRange(node: TSNode): [number, number] {
  return [
    node.getPos() + node.getFullWidth(),
    node.getPos() + node.getFullWidth() + node.getTrailingTriviaWidth(),
  ];
}
