import invariant from "invariant";
import nullthrows from "nullthrows";

import {
  GraphQLEnumType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  Kind,
  type ConstDirectiveNode,
  type GraphQLNamedType,
  type SelectionSetNode,
} from "graphql";

// TODO: keep in sync with CUSTOM_DIRECTIVES in addDirectiveToField

type DirectivesConfig = {
  nonnegative?: boolean;
  slug?: boolean;
  enumValues?: string[];
};

function parseDirectives(
  directives: readonly ConstDirectiveNode[],
): DirectivesConfig {
  const res: DirectivesConfig = {};
  for (const directive of directives) {
    switch (directive.name.value) {
      case "enum": {
        const [arg] = directive.arguments ?? [];
        invariant(arg.value.kind === Kind.LIST, "Expected a list!");
        const enumValues = arg.value.values.map((node) => {
          invariant(node.kind === Kind.STRING, "Expected a string!");
          return node.value;
        });
        invariant(enumValues.length > 0, "Empty enum!");

        res.enumValues = enumValues;
        break;
      }
      case "nonnegative": {
        invariant(!directive.arguments?.length, "No arguments allowed!");
        res.nonnegative = true;
        break;
      }
      case "slug": {
        invariant(!directive.arguments?.length, "No arguments allowed!");
        res.slug = true;
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
): [ZodOutput, string[]] {
  if (currentType instanceof GraphQLScalarType) {
    switch (currentType.name) {
      case "Boolean": {
        invariant(directives.length === 0, "Directives not supported here.");
        return [new ZodOutput("z.boolean()", true), []];
      }
      case "Int": {
        const { nonnegative, ...rest } = parseDirectives(directives);
        invariant(
          Object.values(rest).every((v) => v === false),
          "Unsupported directives!",
        );

        return [
          new ZodOutput(
            ["z.number().int()", nonnegative ? ".nonnegative()" : ""].join(""),
            true,
          ),
          [],
        ];
      }
      case "Date":
      case "DateTime": {
        invariant(directives.length === 0, "Directives not supported here.");
        return [
          new ZodOutput("yyyymmddDateZodType", true),
          [
            'import { yyyymmddDateZodType } from "../../zod-types/yyyymmddDateZodType.ts"',
          ],
        ];
      }
      case "ID":
      case "JSONString": {
        invariant(directives.length === 0, "Directives not supported here.");
        return [new ZodOutput("z.string()", true), []];
      }
      case "String": {
        const { slug, enumValues, ...rest } = parseDirectives(directives);
        invariant(!(slug && enumValues), "Incompatible directive combination!");
        invariant(
          Object.values(rest).every((v) => v === false),
          "Unsupported directives!",
        );

        if (enumValues) {
          return [
            new ZodOutput(`z.enum(${JSON.stringify(enumValues)})`, true),
            [],
          ];
        }

        if (slug) {
          return [
            new ZodOutput("slugZodType", true),
            ['import { slugZodType } from "../../zod-types/slugZodType.ts"'],
          ];
        }

        return [new ZodOutput("z.string()", true), []];
      }
      default: {
        throw new Error("Unsupported scalar type: " + currentType.name);
      }
    }
  }

  if (currentType instanceof GraphQLObjectType) {
    invariant(directives.length === 0, "Directives not supported here.");

    const selections = nullthrows(selectionSet).selections.map(
      (s): [string, string[]] => {
        invariant(s.kind === Kind.FIELD, "Expected direct fields!");

        const processStack: ((prev: ZodOutput) => ZodOutput)[] = [];

        const field = currentType.getFields()[s.name.value];
        let fieldType = field.type;

        while (true) {
          if (fieldType instanceof GraphQLList) {
            processStack.push(
              (prev) =>
                new ZodOutput(`z.array(${prev.stringify(false)})`, true),
            );
            fieldType = fieldType.ofType;
            continue;
          }

          if (fieldType instanceof GraphQLNonNull) {
            processStack.push((prev) => prev.setIsNullable(false));
            fieldType = fieldType.ofType;
            continue;
          }

          const [zodOutput, imports] = generateZod(
            fieldType,
            s.selectionSet,
            field.astNode?.directives ?? [],
          );

          return [
            JSON.stringify(s.name.value) +
              ": " +
              processStack
                .reduceRight((acc, fn) => fn(acc), zodOutput)
                .stringify(),
            imports,
          ];
        }
      },
    );

    return [
      new ZodOutput(
        `z.object({${selections.map((s) => s[0]).join(",")}})`,
        true,
      ),
      selections.flatMap((s) => s[1]),
    ];
  }

  if (currentType instanceof GraphQLEnumType) {
    return [
      new ZodOutput(
        `z.enum(${JSON.stringify(currentType.getValues().map((v) => v.value))})`,
        true,
      ),
      [],
    ];
  }

  throw new Error("Unsupported type: " + currentType.name);
}

export function graphqlToZod(
  queryType: GraphQLObjectType,
  selectionSet: SelectionSetNode,
): [string, string[]] {
  const [zodOutput, imports] = generateZod(queryType, selectionSet);
  return [zodOutput.setIsNullable(false).stringify(), imports];
}
