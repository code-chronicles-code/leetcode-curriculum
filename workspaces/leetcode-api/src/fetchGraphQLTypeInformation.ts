import { z } from "zod";

import { graphqlKindTypeZodType } from "@code-chronicles/util/graphqlKindTypeZodType";
import { isStringEmptyOrWhitespaceOnly } from "@code-chronicles/util/isStringEmptyOrWhitespaceOnly";
import {
  type OptionalInsteadOfNullishValues,
  removeKeysWithNullishValues,
} from "@code-chronicles/util/removeKeysWithNullishValues";
import { squashWhitespace } from "@code-chronicles/util/squashWhitespace";
import { stripPrefixOrThrow } from "@code-chronicles/util/stripPrefixOrThrow";

import { fetchGraphQLData } from "./fetchGraphQLData.ts";
import { normalizeGraphQLDescription } from "./normalizeGraphQLDescription.ts";
import { sortByName } from "./sortByName.ts";

function getTypeFields(depth: number): string {
  const base = "name kind";
  return depth === 1 ? base : `${base} ofType { ${getTypeFields(depth - 1)} }`;
}

// TODO: Validate that a depth of 5 is sufficient below.

const FRAGMENT = squashWhitespace(`
  fragment TypeFields on __Type {
    name
    kind
    description
    enumValues(includeDeprecated: true) {
      name
      description
      isDeprecated
      deprecationReason
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
`);

const GRAPHQL_ENCODING_PREFIX = "t";

function graphqlEncode(s: string): string {
  return GRAPHQL_ENCODING_PREFIX + Buffer.from(s, "utf8").toString("hex");
}

function graphqlDecode(s: string): string {
  return Buffer.from(
    stripPrefixOrThrow(s, GRAPHQL_ENCODING_PREFIX),
    "hex",
  ).toString("utf8");
}

function getQueryAndVariables(
  typeNames: Iterable<string>,
): [string, Record<string, string>] {
  const variables = Object.fromEntries(
    // TODO: .map the iterator once that's more widespread!
    [...typeNames].map((typeName, index) => [`typeName${index}`, typeName]),
  );

  const queryArgs = Object.keys(variables).map(
    (variable) => `$${variable}: String!`,
  );
  const queryFields = Object.entries(variables).map(
    ([variable, typeName]) =>
      `${graphqlEncode(typeName)}: __type(name: $${variable}) { ...TypeFields }`,
  );

  return [
    squashWhitespace(
      `query (${queryArgs.join(",")}) {${queryFields.join(",")}}\n${FRAGMENT}`,
    ),
    variables,
  ];
}

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
  description: z
    .string()
    .nullable()
    .transform((desc) =>
      desc != null && !isStringEmptyOrWhitespaceOnly(desc)
        ? normalizeGraphQLDescription(desc)
        : undefined,
    ),
});

export const graphqlTypeZodType = z.record(
  z.string().transform(graphqlDecode),
  nameAndDescriptionZodType
    .extend({
      kind: graphqlKindTypeZodType,
      enumValues: z
        .array(
          nameAndDescriptionZodType
            .extend({
              isDeprecated: z
                .boolean()
                .transform((isDeprecated) => isDeprecated || null),
              deprecationReason: z.string().nullable(),
            })
            .transform(removeKeysWithNullishValues),
        )
        .nullable(),
      fields: z
        .array(
          nameAndDescriptionZodType
            .extend({
              isDeprecated: z
                .boolean()
                .transform((isDeprecated) => isDeprecated || null),
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
);

export type LeetCodeGraphQLType = NonNullable<
  z.infer<typeof graphqlTypeZodType>[string]
>;

export async function fetchGraphQLTypeInformation(
  typeNames: string[],
): Promise<Record<string, LeetCodeGraphQLType | null>> {
  const distinctTypeNames = new Set(typeNames);
  if (distinctTypeNames.size === 0) {
    return {};
  }

  const [query, variables] = getQueryAndVariables(distinctTypeNames);
  const { data } = await fetchGraphQLData(query, variables);
  return graphqlTypeZodType.parse(data);
}
