import { readFile } from "node:fs/promises";
import path from "node:path";

import { z } from "zod";

const packageJsonZodType = z.object({
  scripts: z.record(z.string(), z.string()).optional(),
});

export type PackageJson = z.infer<typeof packageJsonZodType>;

export async function readPackageJson(
  directory: string = ".",
): Promise<PackageJson> {
  const text = await readFile(path.join(directory, "package.json"), {
    encoding: "utf8",
  });
  return packageJsonZodType.passthrough().parse(JSON.parse(text));
}
