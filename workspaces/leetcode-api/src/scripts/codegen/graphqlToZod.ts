import invariant from "invariant";
import nullthrows from "nullthrows";

import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  Kind,
  type ConstDirectiveNode,
  type GraphQLNamedType,
  type SelectionSetNode,
} from "graphql";

// TODO: get some of these directives added to the schema
type DirectivesConfig = {
  nonnegative: boolean;
};

function parseDirectives(
  directives: readonly ConstDirectiveNode[],
): DirectivesConfig {
  const res = { nonnegative: false };
  for (const directive of directives) {
    switch (directive.name.value) {
      case "nonnegative": {
        invariant(!directive.arguments?.length, "No arguments allowed!");
        res.nonnegative = true;
        break;
      }
      default: {
        throw new Error("Unsupported directive " + directive.name.value);
      }
    }
  }

  return res;
}

class ZodOutput {
  constructor(
    public text: string,
    public isNullable: boolean,
  ) {}

  setIsNullable(isNullable: boolean): this {
    this.isNullable = isNullable;
    return this;
  }

  stringify(canHaveOptionals: boolean = true): string {
    return this.isNullable
      ? [this.text, ".nullable()", canHaveOptionals ? ".optional()" : ""].join(
          "",
        )
      : this.text;
  }
}

function generateZod(
  currentType: GraphQLNamedType,
  selectionSet: SelectionSetNode | undefined,
  directives: readonly ConstDirectiveNode[] = [],
): ZodOutput {
  if (currentType instanceof GraphQLScalarType) {
    switch (currentType.name) {
      case "Boolean": {
        invariant(directives.length === 0, "Directives not supported here.");
        return new ZodOutput("z.boolean()", true);
      }
      case "Int": {
        const directiveConfig = parseDirectives(directives);
        return new ZodOutput(
          [
            "z.number().int()",
            directiveConfig.nonnegative ? ".nonnegative()" : "",
          ].join(""),
          true,
        );
      }
      case "Date":
      case "DateTime":
      case "ID":
      case "String": {
        invariant(directives.length === 0, "Directives not supported here.");
        return new ZodOutput("z.string()", true);
      }
      default: {
        throw new Error("Unsupported scalar type: " + currentType.name);
      }
    }
  }

  if (currentType instanceof GraphQLObjectType) {
    invariant(directives.length === 0, "Directives not supported here.");

    const selections = nullthrows(selectionSet).selections.map((s) => {
      invariant(s.kind === Kind.FIELD, "Expected direct fields!");

      const processStack: ((prev: ZodOutput) => ZodOutput)[] = [];

      const field = currentType.getFields()[s.name.value];
      let fieldType = field.type;

      while (true) {
        if (fieldType instanceof GraphQLList) {
          processStack.push(
            (prev) => new ZodOutput(`z.array(${prev.stringify(false)})`, true),
          );
          fieldType = fieldType.ofType;
          continue;
        }

        if (fieldType instanceof GraphQLNonNull) {
          processStack.push((prev) => prev.setIsNullable(false));
          fieldType = fieldType.ofType;
          continue;
        }

        return (
          JSON.stringify(s.name.value) +
          ": " +
          processStack
            .reduceRight(
              (acc, fn) => fn(acc),
              generateZod(
                fieldType,
                s.selectionSet,
                field.astNode?.directives ?? [],
              ),
            )
            .stringify()
        );
      }
    });

    return new ZodOutput(`z.object({${selections.join(",")}})`, true);
  }

  throw new Error("Unsupported type: " + currentType.name);
}

export function graphqlToZod(
  queryType: GraphQLObjectType,
  selectionSet: SelectionSetNode,
): string {
  return generateZod(queryType, selectionSet).setIsNullable(false).stringify();
}
