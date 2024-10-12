import type { z } from "zod";

export function transformToInt<T extends z.ZodType>(
  zodType: T,
): z.ZodEffects<T, number, z.input<T>> {
  return zodType.transform((value) =>
    typeof value === "number" ? value : parseInt(value, 10),
  );
}
