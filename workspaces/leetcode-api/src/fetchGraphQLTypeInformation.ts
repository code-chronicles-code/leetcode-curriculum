import { z } from "zod";

import { graphqlKindTypeZodType } from "@code-chronicles/util/graphqlKindTypeZodType";
import {
  type OptionalInsteadOfNullishValues,
  removeKeysWithNullishValues,
} from "@code-chronicles/util/removeKeysWithNullishValues";

import { fetchGraphQLData } from "./fetchGraphQLData";
import { sortByName } from "./sortByName";

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
      enumValues(includeDeprecated: true) {
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
          defaultValue
          type {
            ${getTypeFields(5)}
          }
        }
        type {
          ${getTypeFields(5)}
        }
      }
      inputFields {
        name
        description
        defaultValue
        type {
          ${getTypeFields(5)}
        }
      }
      interfaces {
        ${getTypeFields(5)}
      }
      possibleTypes {
        ${getTypeFields(5)}
      }
    }
  }
`
  .trim()
  .replace(/\s+/g, " ");

const innerTypeZodTypeBase = z.strictObject({
  name: z.string().nullable(),
  kind: graphqlKindTypeZodType,
});

export type InnerType = OptionalInsteadOfNullishValues<
  z.infer<typeof innerTypeZodTypeBase>
> & {
  ofType?: InnerType;
};

const innerTypeZodType = innerTypeZodTypeBase
  .extend({
    ofType: z.lazy(() => innerTypeZodType.nullable()),
  })
  .transform(removeKeysWithNullishValues) as z.ZodType<InnerType>;

const nameAndDescriptionZodType = z.strictObject({
  name: z.string(),
  description: z.string().nullable(),
});

export const graphqlTypeZodType = z
  .strictObject({
    __type: nameAndDescriptionZodType
      .extend({
        kind: graphqlKindTypeZodType,
        enumValues: z
          .array(
            nameAndDescriptionZodType.transform(removeKeysWithNullishValues),
          )
          .nullable(),
        fields: z
          .array(
            nameAndDescriptionZodType
              .extend({
                isDeprecated: z.boolean(),
                deprecationReason: z.string().nullable(),
                args: z
                  .array(
                    nameAndDescriptionZodType
                      .extend({
                        defaultValue: z.string().nullable(),
                        type: innerTypeZodType,
                      })
                      .transform(removeKeysWithNullishValues),
                  )
                  .transform((args) =>
                    args.length > 0 ? sortByName(args) : null,
                  ),
                type: innerTypeZodType,
              })
              .transform(removeKeysWithNullishValues),
          )
          .transform(sortByName)
          .nullable(),
        inputFields: z
          .array(
            nameAndDescriptionZodType
              .extend({
                defaultValue: z.string().nullable(),
                type: innerTypeZodType,
              })
              .transform(removeKeysWithNullishValues),
          )
          .transform(sortByName)
          .nullable(),
        interfaces: z
          .array(innerTypeZodType)
          .nullable()
          .transform((interfaces) =>
            interfaces?.length !== 0 ? interfaces : null,
          ),
        possibleTypes: z.array(innerTypeZodType).nullable(),
      })
      .transform(removeKeysWithNullishValues)
      .nullable(),
  })
  .transform((data) => data.__type);

export type LeetCodeGraphQLType = NonNullable<
  z.infer<typeof graphqlTypeZodType>
>;

export async function fetchGraphQLTypeInformation(
  typeName: string,
): Promise<LeetCodeGraphQLType | null> {
  const { data } = await fetchGraphQLData(QUERY, { typeName });
  return graphqlTypeZodType.parse(data);
}
