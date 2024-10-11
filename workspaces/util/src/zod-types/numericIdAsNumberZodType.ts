import { positiveIntOrIntStringZodType } from "@code-chronicles/util/zod-types/positiveIntOrIntStringZodType";
import { transformToInt } from "@code-chronicles/util/zod-types/transformToInt";

export const numericIdAsNumberZodType = transformToInt(
  positiveIntOrIntStringZodType,
);
