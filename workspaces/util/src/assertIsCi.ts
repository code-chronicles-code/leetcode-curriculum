import invariant from "invariant";

import { isCi } from "@code-chronicles/util/isCi";

export function assertIsCi(): void {
  invariant(isCi(), "Expected to be running in a CI environment!");
}
