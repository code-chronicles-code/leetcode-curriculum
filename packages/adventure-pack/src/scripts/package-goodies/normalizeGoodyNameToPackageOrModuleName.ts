export function normalizeGoodyNameToPackageOrModuleName(
  goodyName: string,
): string {
  return goodyName
    .replace(/[A-Z]+/g, ([upper]) => "_" + upper.toLowerCase())
    .replace(/[^a-z0-9]+/gi, "_")
    .replace(/_$/, "")
    .replace(/^_/, "");
}
