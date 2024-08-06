import { numericIdZodType } from "@code-chronicles/util/numericIdZodType";

export const numericIdAsNumberZodType = numericIdZodType.transform((id) =>
  typeof id === "number" ? id : parseInt(id, 10),
);
