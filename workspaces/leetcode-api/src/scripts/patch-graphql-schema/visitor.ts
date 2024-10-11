import {
  Kind,
  type ASTVisitor,
  type DirectiveDefinitionNode,
  type FieldDefinitionNode,
} from "graphql";
import immutableUpdate from "immutability-helper";
import invariant from "invariant";

import { assertSingleASTNode } from "./assertSingleASTNode.ts";
import { CUSTOM_DIRECTIVES } from "./addDirectiveToField.ts";
import { FIELD_MODIFICATIONS } from "./modifications.ts";

export const visitor: ASTVisitor = {
  FieldDefinition(node, _key, _parent, _path, ancestors): FieldDefinitionNode {
    const grandParent = assertSingleASTNode(ancestors.at(-1));
    invariant(
      grandParent.kind === Kind.OBJECT_TYPE_DEFINITION ||
        grandParent.kind === Kind.INTERFACE_TYPE_DEFINITION,
      "Expected an object or interface definition!",
    );

    const modifications =
      FIELD_MODIFICATIONS[grandParent.name.value]?.[node.name.value] ?? [];
    return modifications.reduce((acc, mod) => mod(acc, grandParent), node);
  },

  Document: (node) =>
    immutableUpdate(node, {
      definitions: (prevDefinitions) => [
        ...prevDefinitions,
        ...CUSTOM_DIRECTIVES.map(
          (name): DirectiveDefinitionNode => ({
            kind: Kind.DIRECTIVE_DEFINITION,
            name: { kind: Kind.NAME, value: name },
            repeatable: false,
            locations: [{ kind: Kind.NAME, value: "FIELD_DEFINITION" }],
          }),
        ),
      ],
    }),
};
