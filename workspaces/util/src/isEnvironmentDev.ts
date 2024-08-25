import process from "node:process";

export function isEnvironmentDev(): boolean {
  return process.env.NODE_ENV === "development";
}
