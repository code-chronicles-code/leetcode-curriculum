import invariant from "invariant";
import nullthrows from "nullthrows";

import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  Kind,
  type GraphQLNamedType,
  type SelectionSetNode,
} from "graphql";

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
): ZodOutput {
  if (currentType instanceof GraphQLScalarType) {
    switch (currentType.name) {
      case "Boolean": {
        return new ZodOutput("z.boolean()", true);
      }
      case "Int": {
        return new ZodOutput("z.number().int()", true);
      }
      case "Date":
      case "DateTime":
      case "ID":
      case "String": {
        return new ZodOutput("z.string()", true);
      }
      default: {
        throw new Error("Unsupported scalar type: " + currentType.name);
      }
    }
  }

  if (currentType instanceof GraphQLObjectType) {
    const selections = nullthrows(selectionSet).selections.map((s) => {
      invariant(s.kind === Kind.FIELD, "Expected direct fields!");

      const processStack: ((prev: ZodOutput) => ZodOutput)[] = [];

      let fieldType = currentType.getFields()[s.name.value].type;
      while (
        fieldType instanceof GraphQLList ||
        fieldType instanceof GraphQLNonNull
      ) {
        if (fieldType instanceof GraphQLList) {
          processStack.push(
            (prev) => new ZodOutput(`z.array(${prev.stringify(false)})`, true),
          );
        } else {
          processStack.push((prev) => prev.setIsNullable(false));
        }

        fieldType = fieldType.ofType;
      }

      return (
        JSON.stringify(s.name.value) +
        ": " +
        processStack
          .reduceRight(
            (acc, fn) => fn(acc),
            generateZod(fieldType, s.selectionSet),
          )
          .stringify()
      );
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
