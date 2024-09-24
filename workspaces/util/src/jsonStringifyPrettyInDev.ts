import { isEnvironmentDev } from "@code-chronicles/util/isEnvironmentDev";

export function jsonStringifyPrettyInDev(value: unknown): string {
  return isEnvironmentDev()
    ? JSON.stringify(value, null, 2)
    : JSON.stringify(value);
}
