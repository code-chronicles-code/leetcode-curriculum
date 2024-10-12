import {
  DirectiveLocation,
  Kind,
  type ASTVisitor,
  type DirectiveDefinitionNode,
  type FieldDefinitionNode,
} from "graphql";
import immutableUpdate from "immutability-helper";
import invariant from "invariant";

import { assertSingleASTNode } from "./assertSingleASTNode.ts";
import { nameNode, nonNullTypeNode, listTypeNode } from "./astNodeBuilders.ts";
import { CUSTOM_DIRECTIVES } from "./addDirectiveToField.ts";
import { FIELD_MODIFICATIONS } from "./modifications.ts";

import {
  DIRECTIVE_NAME as ENUM_DIRECTIVE_NAME,
  DIRECTIVE_ARGUMENT_NAME as ENUM_DIRECTIVE_ARGUMENT_NAME,
} from "./addEnumDirectiveToField.ts";

export const visitor: ASTVisitor = {
  FieldDefinition(node, _key, _parent, _path, ancestors): FieldDefinitionNode {
    const grandParent = assertSingleASTNode(ancestors.at(-1));
    invariant(
      grandParent.kind === Kind.OBJECT_TYPE_DEFINITION ||
        grandParent.kind === Kind.INTERFACE_TYPE_DEFINITION,
      "Expected an object or interface definition!",
    );

    // TODO: validate that all the modifications actually got applied

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
            name: nameNode(name),
            repeatable: false,
            locations: [nameNode(DirectiveLocation.FIELD_DEFINITION)],
          }),
        ),

        {
          kind: Kind.DIRECTIVE_DEFINITION,
          name: nameNode(ENUM_DIRECTIVE_NAME),
          repeatable: false,
          locations: [nameNode(DirectiveLocation.FIELD_DEFINITION)],

          arguments: [
            {
              kind: Kind.INPUT_VALUE_DEFINITION,
              name: nameNode(ENUM_DIRECTIVE_ARGUMENT_NAME),
              type: nonNullTypeNode(
                listTypeNode(
                  nonNullTypeNode({
                    kind: Kind.NAMED_TYPE,
                    name: nameNode("String"),
                  }),
                ),
              ),
            },
          ],
        },
      ],
    }),
};

// Use lexicographicSortSchema somewhere
