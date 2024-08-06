import { numericIdZodType } from "@code-chronicles/util/numericIdZodType";

export const numericIdAsStringZodType = numericIdZodType.transform(String);
