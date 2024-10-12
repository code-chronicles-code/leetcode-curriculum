import { positiveIntOrIntStringZodType } from "@code-chronicles/util/zod-types/positiveIntOrIntStringZodType";
import { transformToString } from "@code-chronicles/util/zod-types/transformToString";

export const numericIdAsStringZodType = transformToString(
  positiveIntOrIntStringZodType,
);
