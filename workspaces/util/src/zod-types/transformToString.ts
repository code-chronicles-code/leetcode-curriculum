import type { z } from "zod";

export function transformToString<T extends z.ZodType>(
  zodType: T,
): z.ZodEffects<T, string, z.input<T>> {
  return zodType.transform(String);
}
