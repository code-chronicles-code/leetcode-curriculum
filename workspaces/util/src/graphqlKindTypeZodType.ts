import { z } from "zod";

// See `enum __TypeKind` in: https://github.com/graphql/graphql-spec/blob/main/spec/Section%204%20--%20Introspection.md
export const graphqlKindTypeZodType = z.enum([
  "SCALAR",
  "OBJECT",
  "INTERFACE",
  "UNION",
  "ENUM",
  "INPUT_OBJECT",
  "LIST",
  "NON_NULL",
]);

export type GraphQLKind = z.infer<typeof graphqlKindTypeZodType>;
