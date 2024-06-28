import { Node as TSNode } from "ts-morph";

export function getLeadingTriviaRange(node: TSNode): [number, number] {
  return [node.getPos(), node.getPos() + node.getLeadingTriviaWidth()];
}
