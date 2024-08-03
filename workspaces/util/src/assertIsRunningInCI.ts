import invariant from "invariant";

import { isRunningInCI } from "@code-chronicles/util/isRunningInCI";

export function assertIsRunningInCI(): void {
  invariant(isRunningInCI(), "Expected to be running in a CI environment!");
}
