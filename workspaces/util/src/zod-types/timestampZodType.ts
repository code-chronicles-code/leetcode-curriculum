import { nonNegativeIntOrIntStringZodType } from "@code-chronicles/util/zod-types/nonNegativeIntOrIntStringZodType";
import { transformToInt } from "@code-chronicles/util/zod-types/transformToInt";

export const timestampZodType = transformToInt(
  nonNegativeIntOrIntStringZodType,
);
