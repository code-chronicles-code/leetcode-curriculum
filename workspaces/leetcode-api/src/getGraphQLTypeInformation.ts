import { z } from "zod";

import { compareStringsCaseInsensitive } from "@code-chronicles/util/compareStringsCaseInsensitive";
import {
  type OptionalInsteadOfNullishValues,
  removeNullishValues,
} from "@code-chronicles/util/removeNullishValues";

import { fetchGraphQLData } from "./fetchGraphQLData";

function getTypeFields(depth: number): string {
  const base = "name kind";
  return depth === 1 ? base : `${base} ofType { ${getTypeFields(depth - 1)} }`;
}

// TODO: Validate that a depth of 5 is sufficient below.

const QUERY = `
  query ($typeName: String!) {
    __type(name: $typeName) {
      name
      kind
      description
      enumValues {
        name
        description
      }
      fields(includeDeprecated: true) {
        name
        description
        isDeprecated
        deprecationReason
        args {
          name
          description
          type {
            ${getTypeFields(5)}
          }
        }
        type {
          ${getTypeFields(5)}
        }
      }
    }
  }
`
  .trim()
  .replace(/\s+/g, " ");

const kindParser = z.enum([
  "ENUM",
  "INPUT_OBJECT",
  "INTERFACE",
  "LIST",
  "NON_NULL",
  "OBJECT",
  "SCALAR",
  "UNION",
]);

const innerTypeParserBase = z.strictObject({
  name: z.string().nullable(),
  kind: kindParser,
});

type InnerType = OptionalInsteadOfNullishValues<
  z.infer<typeof innerTypeParserBase>
> & {
  ofType?: InnerType;
};

const innerTypeParser = innerTypeParserBase
  .extend({
    ofType: z.lazy(() => innerTypeParser.nullable()),
  })
  .transform(removeNullishValues) as z.ZodType<InnerType>;

const nameAndDescriptionParser = z.strictObject({
  name: z.string(),
  description: z.string().nullable(),
});

function sortByName<T extends { name: string }>(arr: readonly T[]): T[] {
  return [...arr].sort((a, b) => compareStringsCaseInsensitive(a.name, b.name));
}

const typeParser = z
  .strictObject({
    __type: nameAndDescriptionParser
      .extend({
        kind: kindParser,
        enumValues: z
          .array(nameAndDescriptionParser.transform(removeNullishValues))
          .nullable(),
        fields: z
          .array(
            nameAndDescriptionParser
              .extend({
                isDeprecated: z.boolean(),
                deprecationReason: z.string().nullable(),
                args: z
                  .array(
                    nameAndDescriptionParser
                      .extend({
                        type: innerTypeParser,
                      })
                      .transform(removeNullishValues),
                  )
                  .transform((args) =>
                    args.length > 0 ? sortByName(args) : null,
                  ),
                type: innerTypeParser,
              })
              .transform(removeNullishValues),
          )
          .transform(sortByName),
      })
      .transform(removeNullishValues),
  })
  .transform((data) => data.__type);

export type LeetCodeGraphQLType = z.infer<typeof typeParser>;

export async function getGraphQLTypeInformation(
  typeName: string,
): Promise<LeetCodeGraphQLType> {
  const { data } = await fetchGraphQLData(QUERY, { typeName });
  return typeParser.parse(data);
}
