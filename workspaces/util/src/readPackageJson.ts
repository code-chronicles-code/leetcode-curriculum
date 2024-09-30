import { readFile } from "node:fs/promises";
import path from "node:path";

import { z } from "zod";

const packageJsonZodType = z.object({
  scripts: z.record(z.string(), z.string()).optional(),
  workspaces: z.array(z.string()).optional(),
});

export type PackageJson = z.infer<typeof packageJsonZodType>;

export async function readPackageJson(
  directory: string = ".",
): Promise<PackageJson> {
  const data = JSON.parse(
    await readFile(path.join(directory, "package.json"), {
      encoding: "utf8",
    }),
  );

  // Using Zod for validation only, not for returning, to preserve the ordering
  // of keys in the original data.
  packageJsonZodType.parse(data);
  return data;
}
